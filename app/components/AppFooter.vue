<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="counter-stats">
        <span class="stat-item">
          <strong>Contadores totales creados: {{ countersCount }}</strong>
        </span>
      </div>
      <p class="copyright">&copy; 2025</p>
    </div>
  </footer>
</template>

<script setup>
import { useCounter } from '../composables/useStore';

const { 
  countersCount, 
} = useCounter();
</script>

<style scoped>
/* Footer Container */
.app-footer {
  background-color: var(--color-text);
  color: var(--color-surface);
  padding: var(--spacing-lg);
  text-align: center;
  font-size: var(--font-size-sm);
  inline-size: 100%;
  position: fixed;
  inset-block-end: 0;
  inset-inline-start: 0;
  inset-inline-end: 0;
  z-index: var(--z-index-modal);
}

/* Footer Content */
.footer-content {
  max-inline-size: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Counter Statistics */
.counter-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
  margin-block-end: var(--spacing-sm);
}

.stat-item {
  background-color: var(--color-primary-light);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-xl);
  border: var(--border-width) solid var(--color-primary-border);
  font-size: 0.85rem;
  transition: all var(--transition-fast);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.stat-item:hover {
  background-color: var(--color-primary-border);
  transform: translateY(-1px);
}

/* Copyright */
.copyright {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-xs);
}

/* Mobile Responsive Design */
@media (max-width: 768px) {
  .counter-stats {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  .stat-item {
    font-size: var(--font-size-xs);
    padding: var(--spacing-xs) var(--spacing-md);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .stat-item {
    transition: none;
  }
  
  .stat-item:hover {
    transform: none;
  }
}
</style>
