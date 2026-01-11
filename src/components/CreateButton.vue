<template>
  <button
    :class="['custom-button', `button-${variant}`]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger', 'success'].includes(value)
  },
  label: {
    type: String,
    default: '创建'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.custom-button {
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  min-width: 100px;
  font-family: var(--font-family);
  box-shadow: var(--shadow-md);
}

.custom-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.custom-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.custom-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Primary button - for main actions */
.button-primary {
  background: var(--gradient-primary);
  color: var(--color-white);
  border: 1px solid var(--color-primary);
}

.button-primary:hover:not(:disabled) {
  background: var(--gradient-primary-hover);
  border-color: var(--color-primary-dark);
}

/* Danger button - for delete/clear actions */
.button-danger {
  background: var(--color-danger);
  color: var(--color-white);
  border: 1px solid var(--color-danger);
}

.button-danger:hover:not(:disabled) {
  background: var(--color-danger-dark);
  border-color: var(--color-danger-dark);
}

/* Success button - for complete actions */
.button-success {
  background: var(--color-success);
  color: var(--color-white);
  border: 1px solid var(--color-success);
}

.button-success:hover:not(:disabled) {
  background: var(--color-success-dark);
  border-color: var(--color-success-dark);
}

/* Responsive design */
@media (max-width: 768px) {
  .custom-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: var(--font-size-sm);
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .custom-button {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-xs);
    min-width: 70px;
  }
}
</style>