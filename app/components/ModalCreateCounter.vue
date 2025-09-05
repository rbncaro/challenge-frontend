<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <button class="close-button" @click="closeModal">&times;</button>
      <h2>Crear nuevo contador</h2>
            
      <form @submit.prevent="createCounter">
        <div class="form-group">
          <label for="counter-name">Nombre del contador:</label>
          <input
            id="counter-name"
            v-model="formData.name"
            type="text"
            placeholder="Escribe el nombre del contador"
            :disabled="countersCount >= 20"
            maxlength="20"
            required
          >
          <div class="character-count">
            {{ formData.name.length }}/20 caracteres
          </div>
        </div>


        <div class="modal-actions">
          <button 
            type="submit" 
            class="create-btn"
            :disabled="countersCount >= 20 || !formData.name.trim()"
          >
            Crear
          </button>
          <button type="button" class="cancel-btn" @click="closeModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounter } from '../composables/useStore';

const emit = defineEmits(['create-counter', 'close-modal']);

const { countersCount } = useCounter();

const formData = ref({
  name: '',
  value: 0,
});

const createCounter = () => {
  if (countersCount.value >= 20) {
    alert('no se puede crear mas de 20 contadores!');
    return;
  }

  if (formData.value.name.length > 20) {
    alert('El nombre del contador debe tener 20 caracteres o menos!');
    return;
  }

  if (formData.value.name.trim()) {
    emit('create-counter', {
      name: formData.value.name.trim(),
      value: formData.value.value || 0,
    });
    
    formData.value = {
      name: '',
      value: 0,
    };
  }
};

const closeModal = () => {
  emit('close-modal');
  formData.value = {
    name: '',
    value: 0,
  };
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-modal);
  animation: backdropFadeIn var(--transition-normal) ease-out;
}

@keyframes backdropFadeIn {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.modal {
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl);
  inline-size: 400px;
  max-inline-size: 90vw;
  box-shadow: var(--shadow-xl);
  position: relative;
  animation: modalSlideIn var(--transition-normal) ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Modal Header */
.modal h2 {
  margin: 0 0 var(--spacing-xl) 0;
  color: var(--color-text);
  text-align: center;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xl);
}

.close-button {
  position: absolute;
  inset-block-start: var(--spacing-md);
  inset-inline-end: var(--spacing-md);
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  cursor: pointer;
  color: var(--color-text-secondary);
  inline-size: 30px;
  block-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-full);
  transition: all var(--transition-fast);
}

.close-button:hover {
  background-color: var(--color-background);
  color: var(--color-text);
}

.close-button:focus {
  outline: var(--border-width-thick) solid var(--color-primary);
  outline-offset: var(--spacing-xs);
}

/* Form Groups */
.form-group {
  margin-block-end: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-block-end: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

/* Form Inputs */
.form-group input {
  inline-size: 100%;
  padding: var(--spacing-sm);
  border: var(--border-width) solid var(--color-border-focus);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  box-sizing: border-box;
  background-color: var(--color-surface);
  color: var(--color-text);
  min-block-size: 44px; /* Accessibility - minimum touch target */
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 var(--border-width-thick) var(--color-primary-light);
}

.form-group input:disabled {
  background-color: var(--color-background);
  color: var(--color-text-secondary);
  cursor: not-allowed;
  border-color: var(--color-border);
  opacity: 0.6;
}

/* Character Count */
.character-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-align: end;
  margin-block-start: var(--spacing-xs);
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-block-start: var(--spacing-2xl);
}

.modal-actions button {
  padding: var(--spacing-sm) var(--spacing-xl);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  min-block-size: 44px; /* Accessibility - minimum touch target */
  min-inline-size: 80px;
}

/* Create Button */
.create-btn {
  background-color: var(--color-primary);
  color: var(--color-surface);
}

.create-btn:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.create-btn:focus {
  outline: var(--border-width-thick) solid var(--color-primary);
  outline-offset: var(--spacing-xs);
}

.create-btn:disabled {
  background-color: var(--color-text-secondary);
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.create-btn:disabled:hover {
  background-color: var(--color-text-secondary);
  transform: none;
}

/* Cancel Button */
.cancel-btn {
  background-color: var(--color-text-secondary);
  color: var(--color-surface);
}

.cancel-btn:hover {
  background-color: #4b5563;
  transform: translateY(-1px);
}

.cancel-btn:focus {
  outline: var(--border-width-thick) solid var(--color-text-secondary);
  outline-offset: var(--spacing-xs);
}

/* Mobile Responsive Design */
@media (max-width: 480px) {
  .modal {
    inline-size: 95vw;
    padding: var(--spacing-xl);
  }
  
  .modal h2 {
    font-size: var(--font-size-lg);
  }
  
  .modal-actions {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .modal-actions button {
    inline-size: 100%;
  }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .modal {
    border: var(--border-width-thick) solid var(--color-text);
  }
  
  .form-group input {
    border-width: var(--border-width-thick);
  }
  
  .modal-actions button {
    border: var(--border-width) solid currentColor;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay {
    animation: none;
  }
  
  .modal {
    animation: none;
  }
  
  .close-button,
  .form-group input,
  .modal-actions button {
    transition: none;
  }
  
  .create-btn:hover,
  .cancel-btn:hover {
    transform: none;
  }
}
</style>
