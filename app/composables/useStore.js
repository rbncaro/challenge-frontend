import { computed } from 'vue';
import store from '../../store';

export const useStore = () => {
  return store;
};

export const useCounter = () => {
  // Computed getters with functional approach
  const counters = computed(() => store.getters['counter/allCounters'] || []);
  const countersCount = computed(() => store.getters['counter/countersCount'] || 0);
  const totalValue = computed(() => store.getters['counter/totalValue'] || 0);
  const activeCounters = computed(() => store.getters['counter/activeCounters'] || []);
  const sortCriteria = computed(() => store.getters['counter/sortCriteria'] || '');
  const filterCriteria = computed(() => store.getters['counter/filterCriteria'] || { type: '', value: null });
  const searchTerm = computed(() => store.getters['counter/searchTerm'] || '');
  const filteredAndSortedCounters = computed(() => store.getters['counter/filteredAndSortedCounters'] || []);

  // Pure action creators - return functions that dispatch actions
  const createActionDispatcher = (actionType) => (payload) => store.dispatch(actionType, payload);
  
  const addCounter = createActionDispatcher('counter/addCounter');
  const removeCounter = createActionDispatcher('counter/removeCounter');
  const updateCounter = (id, updates) => store.dispatch('counter/updateCounter', { id, updates });
  const incrementCounter = createActionDispatcher('counter/incrementCounter');
  const decrementCounter = createActionDispatcher('counter/decrementCounter');
  const resetCounter = createActionDispatcher('counter/resetCounter');
  const setCounterValue = (id, value) => store.dispatch('counter/setCounterValue', { id, value });
  const clearStorage = createActionDispatcher('counter/clearStorage');
  const setSortCriteria = createActionDispatcher('counter/setSortCriteria');
  const setFilterCriteria = createActionDispatcher('counter/setFilterCriteria');
  const setSearchTerm = createActionDispatcher('counter/setSearchTerm');
  const clearFilters = createActionDispatcher('counter/clearFilters');

  // Counter by ID selector
  const getCounterById = (id) => computed(() => store.getters['counter/counterById']?.(id));

  return {
    // State
    counters,
    countersCount,
    totalValue,
    activeCounters,
    sortCriteria,
    filterCriteria,
    searchTerm,
    filteredAndSortedCounters,
    
    // Actions
    addCounter,
    removeCounter,
    updateCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    setCounterValue,
    clearStorage,
    setSortCriteria,
    setFilterCriteria,
    setSearchTerm,
    clearFilters,
    
    // Helpers
    getCounterById,
  };
};
