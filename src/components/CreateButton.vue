<template>
  <button
    :class="['custom-button', `button-${variant}`]"
    @click="onButtonClick"
    :disabled="disabled"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

/**
 * CreateButton 组件 - 通用按钮组件
 * 提供三种样式变体：primary（主按钮）、danger（危险按钮）、success（成功按钮）
 * 用于 Todo 应用中的各种操作按钮
 */

// 定义组件属性
const props = defineProps({
  /**
   * 按钮样式变体
   * @type {'primary' | 'danger' | 'success'}
   * @default 'primary'
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger', 'success'].includes(value)
  },

  /**
   * 按钮显示文本
   * @type {string}
   * @default '创建'
   */
  label: {
    type: String,
    default: '创建'
  },

  /**
   * 是否禁用按钮
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  }
})

// 定义组件事件
const emit = defineEmits(['click'])

/**
 * 按钮点击事件处理函数
 * 触发 click 事件，父组件可以监听并处理业务逻辑
 */
const onButtonClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style scoped>
.custom-button {
  /* 基础按钮样式 */
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 100px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.custom-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 主按钮样式 - 用于核心操作（如添加待办） */
.button-primary {
  background: var(--color-primary, #667eea);
  color: white;
  border: 1px solid var(--color-primary, #667eea);
}

.button-primary:hover:not(:disabled) {
  background: var(--color-primary-hover, #5a67d8);
  border-color: var(--color-primary-hover, #5a67d8);
}

/* 危险按钮样式 - 用于删除/清空操作 */
.button-danger {
  background: var(--color-danger, #f56565);
  color: white;
  border: 1px solid var(--color-danger, #f56565);
}

.button-danger:hover:not(:disabled) {
  background: var(--color-danger-hover, #e53e3e);
  border-color: var(--color-danger-hover, #e53e3e);
}

/* 成功按钮样式 - 用于标记完成操作 */
.button-success {
  background: var(--color-success, #48bb78);
  color: white;
  border: 1px solid var(--color-success, #48bb78);
}

.button-success:hover:not(:disabled) {
  background: var(--color-success-hover, #38a169);
  border-color: var(--color-success-hover, #38a169);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .custom-button {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .custom-button {
    padding: 8px 16px;
    font-size: 13px;
    min-width: 70px;
  }
}
</style>