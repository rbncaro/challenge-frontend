<template>
  <header class="app-header">    
    <!-- Controles de ordenamiento y filtrado -->
    <div class="controls-section">
      <div class="logo-section">
        <img src="/logo.png" alt="Los Heroes Logo" class="app-logo">
      </div>
      <div class="search-controls">
        <label>Buscar por nombre:</label>
        <div class="input-container">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Escribe para buscar..."
            class="search-input"
            @input="applySearch"
          >
          <span v-if="searchTerm" class="search-clear" title="Limpiar búsqueda" @click="clearSearch">✕</span>
        </div>
      </div>

      <div class="sort-controls">
        <label>Ordenar por:</label>
        <select v-model="sortBy" class="select-sort" @change="applySorting">
          <option value="">Sin ordenar</option>
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
          <option value="value-asc">Valor (Menor a Mayor)</option>
          <option value="value-desc">Valor (Mayor a Menor)</option>
        </select>
      </div>

      <div class="filter-controls">
        <label>Filtrar por valor:</label>
        <div class="filter-container">
          <select v-model="filterType" class="select-filter" @change="applyFiltering">
            <option value="">Sin filtro</option>
            <option value="greater">Mayor que</option>
            <option value="less">Menor que</option>
          </select>
          
          <input 
            v-if="filterType" 
            v-model.number="filterValue" 
            type="number" 
            placeholder="Valor"
            class="filter-input"
            @input="applyFiltering"
          >
          
          <button 
            v-if="filterType || sortBy || searchTerm" 
            class="clear-filters-btn"
            title="Limpiar filtros"
            @click="clearFilters"
          >
            ✕
          </button>
        </div>
      </div>

      <button class="open-modal-button" @click="showModal = true">Crear contador</button>
    </div>

    <Transition name="modal">
      <ModalCreateCounter v-if="showModal" @close-modal="showModal = false" @create-counter="handleCreateCounter" />
    </Transition>
  </header>
</template>

<script>
import ModalCreateCounter from './ModalCreateCounter.vue';
import { useCounter } from '../composables/useStore';

export default {
  name: 'AppHeader',
  components: {
    ModalCreateCounter,
  },
  data() {
    return {
      showModal: false,
      searchTerm: '',
      sortBy: '',
      filterType: '',
      filterValue: null,
    };
  },
  mounted() {
    this.loadFiltersFromStorage();
  },
  methods: {
    loadFiltersFromStorage() {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const savedFilters = sessionStorage.getItem('appHeaderFilters');
        if (savedFilters) {
          const filters = JSON.parse(savedFilters);
          this.searchTerm = filters.searchTerm || '';
          this.sortBy = filters.sortBy || '';
          this.filterType = filters.filterType || '';
          this.filterValue = filters.filterValue || null;
          
          if (this.searchTerm) {
            this.applySearch();
          }
          if (this.sortBy) {
            this.applySorting();
          }
          if (this.filterType) {
            this.applyFiltering();
          }
        }
      }
    },
    
    saveFiltersToStorage() {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const filters = {
          searchTerm: this.searchTerm,
          sortBy: this.sortBy,
          filterType: this.filterType,
          filterValue: this.filterValue,
        };
        sessionStorage.setItem('appHeaderFilters', JSON.stringify(filters));
      }
    },
    
    handleCreateCounter(counterData) {
      const { addCounter } = useCounter();
      addCounter({
        name: counterData.name || 'New Counter',
        value: counterData.value || 0,
        step: counterData.step || 1,
      });
      console.log('Counter created:', counterData);
      this.showModal = false;
    },
    
    applySearch() {
      const { setSearchTerm } = useCounter();
      setSearchTerm(this.searchTerm);
      this.saveFiltersToStorage();
    },
    
    clearSearch() {
      this.searchTerm = '';
      this.applySearch();
    },
    
    applySorting() {
      const { setSortCriteria } = useCounter();
      setSortCriteria(this.sortBy);
      this.saveFiltersToStorage();
    },
    
    applyFiltering() {
      const { setFilterCriteria } = useCounter();
      setFilterCriteria({
        type: this.filterType,
        value: this.filterValue,
      });
      this.saveFiltersToStorage();
    },
    
    clearFilters() {
      const { clearFilters } = useCounter();
      this.searchTerm = '';
      this.sortBy = '';
      this.filterType = '';
      this.filterValue = null;
      clearFilters();
      this.saveFiltersToStorage();
    },
  },
};
</script>

<style scoped>
/* Header Container */
.app-header {
  background-color: var(--color-surface);
  color: var(--color-text);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  position: relative;
}

/* Logo and Branding */
.logo-section {
  display: flex;
  align-items: center;
  margin-inline-end: var(--spacing-lg);
}

.app-logo {
  block-size: 40px;
  inline-size: auto;
  transition: transform var(--transition-fast);
}

.app-logo:hover {
  transform: scale(1.05);
}

/* Action Button */
.open-modal-button {
  background-color: var(--color-surface);
  color: var(--color-primary);
  border: var(--border-width-thick) solid var(--color-primary);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.open-modal-button:hover {
  background-color: var(--color-primary);
  color: var(--color-surface);
  transform: translateY(-1px);
}

.open-modal-button:focus {
  outline: var(--border-width-thick) solid var(--color-primary);
  outline-offset: var(--spacing-xs);
}

/* Controls Section */
.controls-section {
  display: flex;
  gap: var(--spacing-2xl);
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-block-start: var(--spacing-lg);
}

/* Control Groups */
.search-controls,
.sort-controls,
.filter-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-sm);
  position: relative;
}

.search-controls label,
.sort-controls label,
.filter-controls label {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

/* Input Containers */
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* Form Inputs */
.search-input,
.sort-controls select,
.filter-controls select,
.filter-input {
  background: var(--color-background);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm) var(--spacing-sm);
  display: block;
  inline-size: 100%;
  border: none;
  border-block-end: var(--border-width-thick) solid #EB5D0B;
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  transition: var(--transition-normal) ease all;
  block-size: 34px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.search-input:focus,
.sort-controls select:focus,
.filter-controls select:focus,
.filter-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 var(--border-width-thick) var(--color-primary-light);
}

.filter-input {
  inline-size: 80px;
}

/* Search Clear Button */
.search-clear {
  position: absolute;
  inset-inline-end: var(--spacing-sm);
  inset-block-start: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: var(--color-danger);
  color: var(--color-surface);
  border-radius: var(--border-radius-full);
  inline-size: 18px;
  block-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  transition: background-color var(--transition-fast);
  border: none;
}

.search-clear:hover {
  background-color: var(--color-danger-dark);
}

.search-clear:focus {
  outline: var(--border-width) solid var(--color-surface);
  outline-offset: var(--spacing-xs);
}

/* Clear Filters Button */
.clear-filters-btn {
  background-color: var(--color-danger);
  color: var(--color-surface);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  margin-inline-start: var(--spacing-sm);
  transition: background-color var(--transition-fast);
}

.clear-filters-btn:hover {
  background-color: var(--color-danger-dark);
}

.clear-filters-btn:focus {
  outline: var(--border-width-thick) solid var(--color-danger);
  outline-offset: var(--spacing-xs);
}

/* Mobile Responsive Design */
@media (max-width: 768px) {
  .header-main {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .controls-section {
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  .logo-section {
    margin-inline-end: 0;
    margin-block-end: var(--spacing-sm);
  }
  
  .app-logo {
    block-size: 35px;
  }

  .sort-controls {
    inline-size: 80%;
  }

  .input-container, 
  .filter-container {
    inline-size: 100%;
  }
  
  .search-controls,
  .sort-controls,
  .filter-controls {
    flex-wrap: wrap;
    justify-content: center;
    inline-size: 80%;
  }

  .search-input, 
  .select-sort, 
  .select-filter {
    inline-size: 100%;
  }
}

/* Transition Effects for Modal */
.modal-enter-active, 
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-from, 
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.8) translateY(-20px);
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform var(--transition-normal);
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .search-input,
  .sort-controls select,
  .filter-controls select,
  .filter-input {
    border: var(--border-width) solid var(--color-text);
  }
  
  .open-modal-button {
    border-width: var(--border-width-thick);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .app-logo,
  .open-modal-button,
  .search-clear,
  .clear-filters-btn {
    transition: none;
  }
  
  .open-modal-button:hover {
    transform: none;
  }
}
</style>
