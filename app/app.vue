<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>

</script>

<style>
/* Import utility classes */
@import '~/assets/css/utilities.css';

/* Global CSS Custom Properties */
:root {
  /* Color Palette */
  --color-primary: #f88a33;
  --color-primary-dark: #e67e22;
  --color-primary-darker: #d35400;
  --color-primary-light: rgba(248, 138, 51, 0.2);
  --color-primary-border: rgba(248, 138, 51, 0.3);
  
  /* Neutral Colors */
  --color-background: #f3f4f6;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-border: #e5e7eb;
  --color-border-focus: #ddd;
  
  /* Status Colors */
  --color-danger: #dc3545;
  --color-danger-dark: #c82333;
  --color-warning: #fff3cd;
  --color-warning-border: #ffeaa7;
  --color-warning-text: #856404;
  --color-error-bg: #f8d7da;
  --color-error-border: #f5c6cb;
  --color-error-text: #721c24;
  
  /* Layout & Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  
  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.75rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-base: 1.6;
  
  /* Borders & Radius */
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;
  --border-radius-xl: 20px;
  --border-radius-full: 50%;
  --border-width: 1px;
  --border-width-thick: 2px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-bounce: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Z-index scale */
  --z-index-modal: 1000;
  --z-index-tooltip: 1001;
}

/* Global Reset & Base Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-family-base);
  line-height: var(--line-height-base);
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-base);
}

/* Application Root */
.app {
  min-height: 100vh;
  background-color: var(--color-background);
}

/* Focus Outline Reset for Better Accessibility */
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Screen Reader Only Text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
