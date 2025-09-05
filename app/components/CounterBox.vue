<template>
  <div class="counter-box">
    <h2 class="counter-name">{{ counter?.name || 'Counter' }}</h2>
    <div class="counter-controls">
      <div class="button-wrapper">
        <button 
          aria-label="Decrement"
          :disabled="isDecrementDisabled"
          @click="handleDecrement"
        >
          -
        </button>
        <div v-if="isDecrementDisabled" class="tooltip" :data-tooltip="decrementTooltip">
          {{ decrementTooltip }}
        </div>
      </div>
      <span class="counter-value">{{ counter?.value || 0 }}</span>
      <div class="button-wrapper">
        <button 
          aria-label="Increment"
          :disabled="isIncrementDisabled"
          @click="handleIncrement"
        >
          +
        </button>
        <div v-if="isIncrementDisabled" class="tooltip" :data-tooltip="incrementTooltip">
          {{ incrementTooltip }}
        </div>
      </div>
    </div>
    <div class="counter-actions">
      <button class="action-btn reset-btn" @click="handleReset">Reiniciar</button>
      <button class="action-btn remove-btn" @click="handleRemove">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCounter } from '../composables/useStore';

const props = defineProps({
  counterId: {
    type: Number,
    required: true,
  },
});

const { 
  getCounterById, 
  incrementCounter, 
  decrementCounter, 
  resetCounter, 
  removeCounter,
} = useCounter();

const counter = getCounterById(props.counterId);

const isIncrementDisabled = computed(() => {
  return counter.value && counter.value.value >= 20;
});

const isDecrementDisabled = computed(() => {
  return counter.value && counter.value.value <= 0;
});

const incrementTooltip = computed(() => {
  return isIncrementDisabled.value ? 'Máximo valor alcanzado (20)' : '';
});

const decrementTooltip = computed(() => {
  return isDecrementDisabled.value ? 'Mínimo valor alcanzado (0)' : '';
});

const handleIncrement = () => {
  if (counter.value && counter.value.value < 20) {
    incrementCounter(props.counterId);
  }
};

const handleDecrement = () => {
  if (counter.value && counter.value.value > 0) {
    decrementCounter(props.counterId);
  }
};

const handleReset = () => {
  resetCounter(props.counterId);
};

const handleRemove = () => {
  removeCounter(props.counterId);
};
</script>

<style scoped>
/* Counter Box Container */
.counter-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  inline-size: 200px;
  background-color: var(--color-surface);
  gap: var(--spacing-md);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  contain: layout; /* Performance optimization */
}

.counter-box:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Counter Name */
.counter-name {
  margin: 0;
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  word-break: break-word; /* Prevent overflow */
}

/* Counter Controls */
.counter-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* Counter Value Display */
.counter-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  min-inline-size: 40px;
  text-align: center;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums; /* Better number alignment */
}

/* Counter Actions */
.counter-actions {
  display: flex;
  gap: var(--spacing-sm);
}

/* Button Base Styles */
button {
  background-color: var(--color-primary);
  color: var(--color-surface);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  font-weight: var(--font-weight-medium);
  min-block-size: 44px; /* Accessibility - minimum touch target */
  min-inline-size: 44px;
}

button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

button:active {
  background-color: var(--color-primary-darker);
  transform: translateY(0);
}

button:focus {
  outline: var(--border-width-thick) solid var(--color-primary);
  outline-offset: var(--spacing-xs);
}

/* Disabled Button States */
button:disabled {
  background-color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

button:disabled:hover {
  background-color: var(--color-text-muted);
  transform: none;
}

/* Button Variants */
.action-btn {
  font-size: var(--font-size-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
}

.reset-btn {
  background-color: var(--color-text-secondary);
}

.reset-btn:hover {
  background-color: #4b5563;
}

.remove-btn {
  background-color: var(--color-danger);
}

.remove-btn:hover {
  background-color: var(--color-danger-dark);
}

/* Tooltip Component */
.button-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  inset-block-end: 100%;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: var(--color-surface);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  z-index: var(--z-index-tooltip);
  margin-block-end: 5px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-fast), visibility var(--transition-fast);
  pointer-events: none;
}

.button-wrapper:hover .tooltip {
  opacity: 0.9;
  visibility: visible;
}

/* Tooltip Arrow */
.tooltip::after {
  content: '';
  position: absolute;
  inset-block-start: 100%;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-block-start-color: #333;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .counter-box {
    border-width: var(--border-width-thick);
  }
  
  button {
    border: var(--border-width) solid currentColor;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .counter-box,
  button,
  .tooltip {
    transition: none;
  }
  
  .counter-box:hover,
  button:hover {
    transform: none;
  }
}

/* Mobile Responsive Design */
@media (max-width: 480px) {
  .counter-box {
    inline-size: 180px;
    padding: var(--spacing-md);
  }
  
  .counter-name {
    font-size: var(--font-size-lg);
  }
  
  .counter-value {
    font-size: var(--font-size-lg);
  }
  
  button {
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
