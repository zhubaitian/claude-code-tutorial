<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
/* App layout styles */
#app {
  font-family: var(--font-family);
  min-height: 100vh;
  padding: var(--spacing-xl);
  color: var(--color-gray-800);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>