<template>
  <header class="app-header">
    <nav class="nav-container">
      <div class="logo">
        <i class="fas fa-tasks"></i>
        <span>Vue Todo</span>
      </div>
      <ul class="nav-menu">
        <li>
          <router-link to="/" class="nav-link" active-class="active">
            <i class="fas fa-home"></i>
            <span>首页</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link" active-class="active">
            <i class="fas fa-info-circle"></i>
            <span>关于</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Header组件逻辑 - 不需要额外逻辑，只有模板和样式
</script>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-lg) var(--spacing-2xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-white);
  font-family: var(--font-family);
}

.logo i {
  font-size: 1.8rem;
  color: var(--color-white);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-xl);
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  transform: translateY(-2px);
}

.nav-link.active {
  background: rgba(var(--color-primary-rgb, 102, 126, 234), 0.2);
  color: var(--color-white);
  border: 1px solid rgba(var(--color-primary-rgb, 102, 126, 234), 0.4);
}

.nav-link i {
  font-size: var(--font-size-lg);
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .nav-menu {
    width: 100%;
    justify-content: center;
  }
}
</style>