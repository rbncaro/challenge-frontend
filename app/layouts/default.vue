<template>
  <div class="layout-container">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header"
    "main"
    "footer";
}

/* Main Content Area */
.main-content {
  grid-area: main;
  padding-block-end: 120px; /* Space for fixed footer - using logical property */
  contain: layout; /* Performance optimization */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    padding-block-end: 140px; /* More space on mobile for larger footer */
  }
}
</style>