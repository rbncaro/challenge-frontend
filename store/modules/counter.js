// LocalStorage key for persisting counter data
const STORAGE_KEY = 'counter_store_data';

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const createSearchFilter = (searchTerm) => (counters) => {
  if (!searchTerm?.trim()) {
    return counters;
  }
  const searchLower = searchTerm.toLowerCase().trim();
  return counters.filter(counter => 
    counter.name.toLowerCase().includes(searchLower),
  );
};

const createValueFilter = (filterCriteria) => (counters) => {
  if (!filterCriteria.type || filterCriteria.value === null) {
    return counters;
  }
  const { type, value: filterValue } = filterCriteria;
  
  return counters.filter(counter => {
    if (type === 'greater') {
      return counter.value > filterValue;
    }
    if (type === 'less') {
      return counter.value < filterValue;
    }
    return true;
  });
};

const createSorter = (sortCriteria) => (counters) => {
  if (!sortCriteria) {
    return counters;
  }
  
  const sortFunctions = {
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'name-desc': (a, b) => b.name.localeCompare(a.name),
    'value-asc': (a, b) => a.value - b.value,
    'value-desc': (a, b) => b.value - a.value,
  };
  
  const sortFn = sortFunctions[sortCriteria];
  return sortFn ? [...counters].sort(sortFn) : counters;
};

// Load state from localStorage
const loadFromStorage = () => {
  try {
    // Check if we're in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          counters: parsed.counters || [],
          nextId: parsed.nextId || 1,
        };
      }
    }
  } catch (error) {
    console.warn('Failed to load counter data from localStorage:', error);
  }
  return {
    counters: [],
    nextId: 1,
  };
};

// Save state to localStorage
const saveToStorage = (state) => {
  try {
    // Check if we're in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        counters: state.counters,
        nextId: state.nextId,
      }));
    }
  } catch (error) {
    console.warn('Failed to save counter data to localStorage:', error);
  }
};

const state = {
  ...loadFromStorage(),
  sortCriteria: '',
  filterCriteria: { type: '', value: null },
  searchTerm: '',
};

const mutations = {
  ADD_COUNTER(state, counter) {
    const newCounter = {
      id: state.nextId,
      name: counter.name || `Counter ${state.nextId}`,
      value: counter.value || 0,
      step: counter.step || 1,
      ...counter,
    };
    state.counters = [...state.counters, newCounter];
    state.nextId = state.nextId + 1;
  },

  REMOVE_COUNTER(state, counterId) {
    state.counters = state.counters.filter(counter => counter.id !== counterId);
  },

  UPDATE_COUNTER(state, { id, updates }) {
    state.counters = state.counters.map(counter =>
      counter.id === id 
        ? { ...counter, ...updates }
        : counter,
    );
  },

  INCREMENT_COUNTER(state, counterId) {
    state.counters = state.counters.map(counter =>
      counter.id === counterId 
        ? { ...counter, value: counter.value + counter.step }
        : counter,
    );
  },

  DECREMENT_COUNTER(state, counterId) {
    state.counters = state.counters.map(counter =>
      counter.id === counterId 
        ? { ...counter, value: counter.value - counter.step }
        : counter,
    );
  },

  RESET_COUNTER(state, counterId) {
    state.counters = state.counters.map(counter =>
      counter.id === counterId 
        ? { ...counter, value: 0 }
        : counter,
    );
  },

  SET_COUNTER_VALUE(state, { id, value }) {
    state.counters = state.counters.map(counter =>
      counter.id === id 
        ? { ...counter, value }
        : counter,
    );
  },

  SET_SORT_CRITERIA(state, criteria) {
    state.sortCriteria = criteria;
  },

  SET_FILTER_CRITERIA(state, criteria) {
    state.filterCriteria = criteria;
  },

  SET_SEARCH_TERM(state, searchTerm) {
    state.searchTerm = searchTerm;
  },

  CLEAR_FILTERS(state) {
    state.sortCriteria = '';
    state.filterCriteria = { type: '', value: null };
    state.searchTerm = '';
  },

  SET_COUNTERS(state, counters) {
    state.counters = counters;
  },

  SET_NEXT_ID(state, nextId) {
    state.nextId = nextId;
  },
};

const actions = {
  addCounter({ commit, state }, counter) {
    commit('ADD_COUNTER', counter);
    saveToStorage(state);
  },

  removeCounter({ commit, state }, counterId) {
    commit('REMOVE_COUNTER', counterId);
    saveToStorage(state);
  },

  updateCounter({ commit, state }, { id, updates }) {
    commit('UPDATE_COUNTER', { id, updates });
    saveToStorage(state);
  },

  incrementCounter({ commit, state }, counterId) {
    commit('INCREMENT_COUNTER', counterId);
    saveToStorage(state);
  },

  decrementCounter({ commit, state }, counterId) {
    commit('DECREMENT_COUNTER', counterId);
    saveToStorage(state);
  },

  resetCounter({ commit, state }, counterId) {
    commit('RESET_COUNTER', counterId);
    saveToStorage(state);
  },

  setCounterValue({ commit, state }, { id, value }) {
    commit('SET_COUNTER_VALUE', { id, value });
    saveToStorage(state);
  },

  setSortCriteria({ commit }, criteria) {
    commit('SET_SORT_CRITERIA', criteria);
  },

  setFilterCriteria({ commit }, criteria) {
    commit('SET_FILTER_CRITERIA', criteria);
  },

  setSearchTerm({ commit }, searchTerm) {
    commit('SET_SEARCH_TERM', searchTerm);
  },

  clearFilters({ commit }) {
    commit('CLEAR_FILTERS');
  },

  clearStorage({ commit }) {
    try {
      // Check if we're in browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
      // Reset the state to default values
      commit('SET_COUNTERS', []);
      commit('SET_NEXT_ID', 1);
    } catch (error) {
      console.warn('Failed to clear counter data from localStorage:', error);
    }
  },
};

const getters = {
  allCounters: state => state.counters,
  
  counterById: state => id => state.counters.find(counter => counter.id === id),
  
  countersCount: state => state.counters.length,
  
  totalValue: state => state.counters.reduce((sum, counter) => sum + counter.value, 0),
  
  activeCounters: state => state.counters.filter(counter => counter.value > 0),
  
  sortCriteria: state => state.sortCriteria,
  
  filterCriteria: state => state.filterCriteria,
  
  searchTerm: state => state.searchTerm,
  
  filteredAndSortedCounters: state => {
    const searchFilter = createSearchFilter(state.searchTerm);
    const valueFilter = createValueFilter(state.filterCriteria);
    const sorter = createSorter(state.sortCriteria);
    
    return pipe(
      searchFilter,
      valueFilter,
      sorter,
    )(state.counters);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
