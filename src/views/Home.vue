<template>
  <main class="main-content">
    <div class="input-group">
      <input
        id="new-todo-input"
        type="text"
        v-model="newTodo"
        placeholder="添加新任务..."
        class="text-input"
        @keyup.enter="addTodo"
      >
      <button class="btn btn-primary" @click="addTodo" :disabled="!newTodo.trim()">
        <i class="fas fa-plus"></i> 添加
      </button>
    </div>

    <div class="todo-container">

      <div class="todo-list" v-if="todos.length > 0">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item"
          :class="{ 'completed': todo.completed }"
        >
          <div class="todo-content">
            <input
              type="checkbox"
              :id="'todo-' + todo.id"
              v-model="todo.completed"
              class="todo-checkbox"
            >
            <template v-if="editingId === todo.id">
              <input
                type="text"
                v-model="editingText"
                @keyup.enter="saveEdit(todo.id)"
                @blur="saveEdit(todo.id)"
                class="edit-input"
                autofocus
              >
            </template>
            <template v-else>
              <label :for="'todo-' + todo.id" class="todo-text" @dblclick="startEdit(todo)">
                {{ todo.text }}
              </label>
            </template>
          </div>
          <div class="todo-actions">
            <template v-if="editingId === todo.id">
              <button class="btn-save" @click="saveEdit(todo.id)" title="保存">
                <i class="fas fa-check"></i>
              </button>
            </template>
            <template v-else>
              <button class="btn-edit" @click="startEdit(todo)" title="编辑">
                <i class="fas fa-edit"></i>
              </button>
            </template>
            <button class="btn-delete" @click="removeTodo(todo.id)" title="删除任务">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="empty-state" v-else>
        <i class="fas fa-clipboard-list"></i>
        <p>还没有任何任务</p>
        <p class="empty-hint">添加第一个任务开始吧！</p>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
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

// 计算属性
const totalTodos = computed(() => todos.value.length)
const completedTodos = computed(() => todos.value.filter(todo => todo.completed).length)
const pendingTodos = computed(() => totalTodos.value - completedTodos.value)

// 方法
const addTodo = () => {
  const trimmedText = newTodo.value.trim()
  if (!trimmedText) return

  const newId = todos.value.length > 0 ? Math.max(...todos.value.map(t => t.id)) + 1 : 1
  todos.value.push({
    id: newId,
    text: trimmedText,
    completed: false
  })
  newTodo.value = ''
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  // 如果正在编辑的任务被删除，则取消编辑状态
  if (editingId.value === id) {
    editingId.value = null
    editingText.value = ''
  }
}

const startEdit = (todo) => {
  editingId.value = todo.id
  editingText.value = todo.text
}

const saveEdit = (id) => {
  const trimmedText = editingText.value.trim()
  if (!trimmedText) {
    // 如果编辑后文本为空，则删除该任务
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
  todos.value = todos.value.filter(todo => !todo.completed)
}

const clearAll = () => {
  todos.value = []
}
</script>

<style scoped>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-content {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: #48bb78;
  color: white;
}

.btn-reset {
  background: #f56565;
  color: white;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Input styles */
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-group .text-input {
  flex: 1;
}

.text-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.edit-input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #667eea;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
}

.edit-input:focus {
  outline: none;
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}

/* Todo list */
.todo-list {
  margin: 20px 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.todo-item:hover {
  border-color: #cbd5e0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.todo-item.completed {
  background: #f0fff4;
  border-color: #9ae6b4;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  font-size: 1.1rem;
  color: #4a5568;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
}

.todo-item.completed .todo-text {
  color: #718096;
  text-decoration: line-through;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-save,
.btn-delete {
  background: #f56565;
  color: white;
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #4299e1;
}

.btn-save {
  background: #48bb78;
}

.btn-edit:hover {
  background: #3182ce;
}

.btn-save:hover {
  background: #38a169;
}

.btn-delete:hover {
  background: #c53030;
  transform: scale(1.1);
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #718096;
}

.empty-state i {
  font-size: 3rem;
  color: #cbd5e0;
  margin-bottom: 15px;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 0.9rem;
  color: #a0aec0;
}

/* Hint text */
.hint-text {
  margin-top: 10px;
  color: #718096;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint-text i {
  color: #667eea;
}

/* Instructions list */
.instructions-list {
  list-style: none;
}

.instructions-list li {
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.instructions-list li:last-child {
  border-bottom: none;
}

.instructions-list li i {
  color: #48bb78;
  min-width: 20px;
}

/* Actions */
.actions {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

/* Animation for interactive elements */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.5s ease-out;
}

.message, .counter, .dynamic-text {
  animation: fadeIn 0.3s ease-out;
}
</style>