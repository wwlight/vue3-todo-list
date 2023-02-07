<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import Item from './Item.vue';

const todosStore = useTodosStore();
const emit = defineEmits(['update:checkAll', 'update:isIndeterminate']);

const handleCheckedChange = (doneTodos: any[]): void => {
  todosStore.updateTodo(doneTodos);
  emit('update:checkAll', todosStore.checkAllBool);
  emit('update:isIndeterminate', todosStore.isIndeterminate);
}
</script>

<template>
  <el-checkbox-group :model-value="todosStore.doneTodos" @change="handleCheckedChange">
    <Item v-for="todo in todosStore.todos" :key="todo.id" :todo="todo" />
  </el-checkbox-group>
</template>

<style scoped lang="scss">
.el-checkbox-group {
  display: grid;
}
</style>
