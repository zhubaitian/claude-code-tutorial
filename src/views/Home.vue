<template>
  <main class="main-content">
    <!-- DemoButton 组件展示区域 -->
    <div class="demo-button-showcase">
      <h2>演示按钮组件</h2>
      <div class="button-group">
        <DemoButton variant="primary" label="主按钮" @click="handleButtonClick('primary')" />
        <DemoButton variant="danger" label="危险按钮" @click="handleButtonClick('danger')" />
        <DemoButton variant="success" label="成功按钮" @click="handleButtonClick('success')" />
      </div>
      <div class="button-group">
        <DemoButton variant="primary" label="禁用按钮" :disabled="true" />
        <DemoButton variant="danger" label="禁用危险" :disabled="true" />
        <DemoButton variant="success" label="禁用成功" :disabled="true" />
      </div>
      <p class="hint-text">
        <i class="fas fa-info-circle"></i>
        点击按钮查看控制台输出，三种变体分别用于不同场景。禁用按钮展示禁用状态样式。
      </p>
    </div>

    <!-- Todo Input Section -->
    <div class="input-group">
      <input
        id="new-todo-input"
        type="text"
        v-model="newTodo"
        placeholder="添加新任务..."
        class="text-input"
        @keyup.enter="addTodo"
      >
      <CreateButton @click="addTodo" :disabled="!newTodo.trim()">
        <i class="fas fa-plus"></i> 添加
      </CreateButton>
    </div>

    <!-- Todo List Section -->
    <div class="todo-container">
      <div class="todo-list" v-if="todos.length > 0">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :editing-id="editingId"
          @edit="startEdit"
          @save="saveEdit"
          @remove="removeTodo"
        />
      </div>

      <!-- Empty State -->
      <div class="empty-state" v-else>
        <i class="fas fa-clipboard-list"></i>
        <p>还没有任何任务</p>
        <p class="empty-hint">添加第一个任务开始吧！</p>
      </div>
    </div>

    <!-- Todo Stats -->
    <div class="todo-stats" v-if="todos.length > 0">
      <div class="stat-item">
        <i class="fas fa-list"></i>
        <span>总计: {{ totalTodos }}</span>
      </div>
      <div class="stat-item">
        <i class="fas fa-check-circle"></i>
        <span>已完成: {{ completedTodos }}</span>
      </div>
      <div class="stat-item">
        <i class="fas fa-clock"></i>
        <span>待完成: {{ pendingTodos }}</span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import TodoItem from '../components/TodoItem.vue'
import CreateButton from '../components/CreateButton.vue'
import DemoButton from '../components/DemoButton.vue'

// Reactive data
const newTodo = ref('')
const editingId = ref(null)
const editingText = ref('')
const todos = ref([
  { id: 1, text: '学习Vue 3基础', completed: true },
  { id: 2, text: '掌握Composition API', completed: true },
  { id: 3, text: '构建待办事项应用', completed: false },
  { id: 4, text: '学习Vue Router', completed: false },
  { id: 5, text: '了解Pinia状态管理', completed: false }
])

// Computed properties
const totalTodos = computed(() => todos.value.length)
const completedTodos = computed(() => todos.value.filter(todo => todo.completed).length)
const pendingTodos = computed(() => totalTodos.value - completedTodos.value)

// Methods
function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return

  const newId = todos.value.length > 0 ? Math.max(...todos.value.map(t => t.id)) + 1 : 1
  todos.value.push({ id: newId, text, completed: false })
  newTodo.value = ''
}

function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
  // If editing task is deleted, cancel edit state
  if (editingId.value === id) {
    editingId.value = null
    editingText.value = ''
  }
}

function startEdit(id, text) {
  editingId.value = id
  editingText.value = text
}

function saveEdit(id, text) {
  const trimmedText = text.trim()
  if (!trimmedText) {
    // If edit results in empty text, remove the todo
    removeTodo(id)
    return
  }

  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.text = trimmedText
  }
  editingId.value = null
  editingText.value = ''
}

const clearCompleted = () => {
  todos.value = todos.value.filter((todo) => !todo.completed);
};

const clearAll = () => {
  todos.value = [];
};

/**
 * 处理演示按钮点击事件
 * @param {string} variant - 按钮变体类型
 */
const handleButtonClick = (variant) => {
  console.log(`DemoButton clicked: ${variant} variant`);

  // 根据按钮类型执行不同操作
  switch (variant) {
    case 'primary':
      // 主按钮逻辑 - 可以添加新任务
      if (newTodo.value.trim()) {
        addTodo();
      } else {
        newTodo.value = '来自主按钮的新任务';
      }
      break;
    case 'danger':
      // 危险按钮逻辑 - 清除已完成任务
      clearCompleted();
      break;
    case 'success':
      // 成功按钮逻辑 - 标记所有任务为完成
      todos.value.forEach(todo => {
        todo.completed = true;
      });
      break;
  }
};
</script>

<style scoped>
.main-content {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* Input Section */
.input-group {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.input-group .text-input {
  flex: 1;
}

.text-input {
  width: 100%;
  padding: var(--spacing-lg);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  transition: border-color 0.3s ease;
}

.text-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb, 102, 126, 234), 0.1);
}

/* Todo List */
.todo-list {
  margin: var(--spacing-xl) 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  color: var(--color-gray-500);
}

.empty-state i {
  font-size: 3rem;
  color: var(--color-gray-300);
  margin-bottom: var(--spacing-lg);
}

.empty-state p {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.empty-hint {
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
}

/* Todo Stats */
.todo-stats {
  display: flex;
  justify-content: space-around;
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-white);
  font-size: var(--font-size-sm);
}

.stat-item i {
  font-size: var(--font-size-lg);
}

.stat-item:nth-child(1) i { color: var(--color-primary); }
.stat-item:nth-child(2) i { color: var(--color-success); }
.stat-item:nth-child(3) i { color: var(--color-danger); }

/* DemoButton 展示区域样式 */
.demo-button-showcase {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.demo-button-showcase h2 {
  color: #1e293b;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
}

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.hint-text {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .demo-button-showcase {
    padding: 20px;
    margin-bottom: 24px;
  }

  .button-group {
    gap: 12px;
    flex-direction: column;
    align-items: center;
  }

  .button-group .demo-button {
    width: 100%;
    max-width: 200px;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }

  .todo-stats {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
  }
}
</style>