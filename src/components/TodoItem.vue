<template>
  <div
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
      <template v-if="isEditing">
        <input
          type="text"
          v-model="editingText"
          @keyup.enter="saveEdit"
          @blur="saveEdit"
          class="edit-input"
          autofocus
        >
      </template>
      <template v-else>
        <label :for="'todo-' + todo.id" class="todo-text" @dblclick="startEdit">
          {{ todo.text }}
        </label>
      </template>
    </div>
    <div class="todo-actions">
      <template v-if="isEditing">
        <button class="btn-save" @click="saveEdit" title="保存">
          <i class="fas fa-check"></i>
        </button>
      </template>
      <template v-else>
        <button class="btn-edit" @click="startEdit" title="编辑">
          <i class="fas fa-edit"></i>
        </button>
      </template>
      <button class="btn-delete" @click="removeTodo" title="删除任务">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  editingId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['edit', 'save', 'remove'])

const editingText = ref('')

const isEditing = computed(() => props.editingId === props.todo.id)

function startEdit() {
  editingText.value = props.todo.text
  emit('edit', props.todo.id, props.todo.text)
}

function saveEdit() {
  const trimmedText = editingText.value.trim()
  if (!trimmedText) {
    // If edit results in empty text, remove the todo
    emit('remove', props.todo.id)
    return
  }
  emit('save', props.todo.id, trimmedText)
}

function removeTodo() {
  emit('remove', props.todo.id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-white);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-sm);
  border: 1px solid var(--color-gray-200);
  transition: all 0.3s ease;
}

.todo-item:hover {
  border-color: var(--color-gray-300);
  box-shadow: var(--shadow-sm);
}

.todo-item.completed {
  background: rgba(var(--color-success-rgb, 72, 187, 120), 0.1);
  border-color: rgba(var(--color-success-rgb, 72, 187, 120), 0.3);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
}

.todo-item.completed .todo-text {
  color: var(--color-gray-500);
  text-decoration: line-through;
}

.todo-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.btn-edit,
.btn-save,
.btn-delete {
  background: var(--color-danger);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: var(--color-info);
}

.btn-save {
  background: var(--color-success);
}

.btn-edit:hover {
  background: rgba(var(--color-info-rgb, 66, 153, 225), 0.8);
}

.btn-save:hover {
  background: var(--color-success-dark);
}

.btn-delete:hover {
  background: var(--color-danger-dark);
  transform: scale(1.1);
}

.edit-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background: var(--color-white);
}

.edit-input:focus {
  outline: none;
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(var(--color-secondary-rgb, 118, 75, 162), 0.1);
}
</style>