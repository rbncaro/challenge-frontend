<template>
  <div class="counter-container">
    <div class="header">
      
      
      <div v-if="countersCount >= 18" class="limit-warning">
        <p v-if="countersCount >= 20" class="limit-reached">
          ⚠️ Límite alcanzado! No se pueden crear más contadores (20/20)
        </p>
        <p v-else class="approaching-limit">
          ⚠️ Aproximándose al límite: {{ countersCount }}/20 contadores
        </p>
      </div>
    </div>

    <div v-if="counters.length === 0" class="empty-state">
      <p>Aun no hay contadores. Haz click en "Crear contador" para iniciar.</p>
      <button 
        class="add-btn" 
        :class="{ 'disabled': countersCount >= 20 }"
        :disabled="countersCount >= 20"
        @click="handleAddClick"
      >
        + Crear contador
      </button>
    </div>

    <div v-else class="counters-grid">
      <TransitionGroup
        name="counter"
        tag="div"
        class="counters-transition-group"
      >
        <CounterBox 
          v-for="counter in filteredAndSortedCounters" 
          :key="counter.id" 
          :counter-id="counter.id" 
        />
      </TransitionGroup>
    </div>

    <Transition name="modal">
      <ModalCreateCounter 
        v-if="showModal" 
        @create-counter="handleCreateCounter"
        @close-modal="showModal = false"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounter } from '../composables/useStore';
import CounterBox from './CounterBox.vue';
import ModalCreateCounter from './ModalCreateCounter.vue';

const showModal = ref(false);

const { 
  counters,
  countersCount,
  filteredAndSortedCounters,
  addCounter,
} = useCounter();

const handleCreateCounter = (counterData) => {
  addCounter({
    name: counterData.name || 'New Counter',
    value: counterData.value || 0,
  });
  showModal.value = false;
};

const handleAddClick = () => {
  if (countersCount.value >= 20) {
    alert('Cannot create more than 20 counters!');
    return;
  }
  showModal.value = true;
};
</script>

<style scoped>
/* Container Layout */
.counter-container {
  padding: var(--spacing-3xl);
  max-inline-size: 1200px;
  margin: 0 auto;
}

/* Header Section */
.header {
  text-align: center;
  margin-block-end: var(--spacing-3xl);
}

.header h1 {
  color: var(--color-text);
  margin-block-end: var(--spacing-lg);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-3xl);
}

/* Limit Warning Messages */
.limit-warning {
  margin: var(--spacing-lg) 0;
}

.limit-warning p {
  margin: 0;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.approaching-limit {
  background-color: var(--color-warning);
  border: var(--border-width) solid var(--color-warning-border);
  color: var(--color-warning-text);
}

.limit-reached {
  background-color: var(--color-error-bg);
  border: var(--border-width) solid var(--color-error-border);
  color: var(--color-error-text);
}

/* Add Button */
.add-btn {
  background-color: var(--color-primary);
  color: var(--color-surface);
  border: none;
  border-radius: var(--border-radius-md);
  padding: 0.75rem var(--spacing-2xl);
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  min-block-size: 44px; /* Accessibility - minimum touch target */
}

.add-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.add-btn:focus {
  outline: var(--border-width-thick) solid var(--color-primary);
  outline-offset: var(--spacing-xs);
}

.add-btn:disabled,
.add-btn.disabled {
  background-color: var(--color-text-secondary);
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.add-btn:disabled:hover,
.add-btn.disabled:hover {
  background-color: var(--color-text-secondary);
  transform: none;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

/* Counters Grid Layout */
.counters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-2xl);
  justify-items: center;
}

.counters-transition-group {
  display: contents;
}

/* Counter Transition Animations */
.counter-enter-active {
  transition: all var(--transition-bounce);
}

.counter-leave-active {
  transition: all var(--transition-normal) ease-in;
}

.counter-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.counter-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.counter-move {
  transition: transform var(--transition-normal);
}

/* Modal Transition Effects */
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

/* Mobile Responsive Design */
@media (max-width: 768px) {
  .counter-container {
    padding: var(--spacing-lg);
  }
  
  .header h1 {
    font-size: var(--font-size-2xl);
  }
  
  .counters-grid {
    grid-template-columns: 1fr;
    max-inline-size: 300px;
    margin: 0 auto;
    gap: var(--spacing-lg);
  }
  
  .empty-state {
    padding: var(--spacing-2xl);
    font-size: var(--font-size-base);
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .add-btn {
    border: var(--border-width) solid currentColor;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .add-btn,
  .counter-enter-active,
  .counter-leave-active,
  .counter-move,
  .modal-enter-active,
  .modal-leave-active {
    transition: none;
  }
  
  .add-btn:hover {
    transform: none;
  }
  
  .counter-enter-from,
  .counter-leave-to {
    transform: none;
  }
}
</style>
