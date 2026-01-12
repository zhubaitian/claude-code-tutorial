<template>
  <button
    :class="['demo-button', `demo-button--${variant}`]"
    @click="handleClick"
    :disabled="disabled"
    :type="type"
    :aria-label="label"
    :aria-disabled="disabled"
    :aria-pressed="pressed"
    @keydown.enter="handleKeydown"
    @keydown.space="handleKeydown"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>

/**
 * DemoButton - 演示按钮组件
 * 提供三种变体：primary（主按钮）、danger（危险按钮）、success（成功按钮）
 * 用于展示不同场景下的按钮样式和交互
 */

// 定义组件属性
const props = defineProps({
  /**
   * 按钮变体类型
   * @type {'primary' | 'danger' | 'success'}
   * @default 'primary'
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger', 'success'].includes(value),
  },

  /**
   * 按钮显示文本（当没有插槽内容时使用）
   * @type {string}
   * @default '按钮'
   */
  label: {
    type: String,
    default: '按钮',
  },

  /**
   * 是否禁用按钮
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 按钮类型
   * @type {'button' | 'submit' | 'reset'}
   * @default 'button'
   */
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },

  /**
   * 是否处于按下状态（用于切换按钮）
   * @type {boolean}
   * @default false
   */
  pressed: {
    type: Boolean,
    default: false,
  },
});

// 定义组件事件
const emit = defineEmits(['click']);

/**
 * 处理按钮点击事件
 * @param {Event} event - 点击事件对象
 */
const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
    // 预留点击逻辑位置，可根据需要添加自定义逻辑
    console.log('DemoButton clicked:', { variant: props.variant, label: props.label });
  }
};

/**
 * 处理键盘事件（Enter 和 Space 键）
 * @param {KeyboardEvent} event - 键盘事件对象
 */
const handleKeydown = (event) => {
  if (!props.disabled && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault(); // 防止空格键滚动页面
    emit('click', event);
    console.log('DemoButton activated via keyboard:', { variant: props.variant, label: props.label });
  }
};
</script>

<style scoped>
.demo-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 100px;
  outline: none;
  position: relative;
  overflow: hidden;
}

/* 主按钮样式 - 蓝色背景，白色文字 */
.demo-button--primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

/* 危险按钮样式 - 红色背景，白色文字 */
.demo-button--danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
}

/* 成功按钮样式 - 绿色背景，白色文字 */
.demo-button--success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

/* 悬停效果 */
.demo-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.demo-button--primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
}

.demo-button--danger:hover:not(:disabled) {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  box-shadow: 0 6px 12px rgba(239, 68, 68, 0.3);
}

.demo-button--success:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}

/* 激活状态 */
.demo-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 禁用状态 */
.demo-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 焦点状态 */
.demo-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* 涟漪效果 */
.demo-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.demo-button:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0) translate(-50%, -50%);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25) translate(-50%, -50%);
    opacity: 0.3;
  }
  100% {
    transform: scale(40, 40) translate(-50%, -50%);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-button {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 80px;
  }
}
</style>