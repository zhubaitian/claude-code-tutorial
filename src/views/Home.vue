<template>
  <main class="main-content">
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