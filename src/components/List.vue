<template>
  <el-checkbox-group :model-value="$store.state.todos.doneTodos" @change="handleCheckedChange">
    <Item v-for="todo in todos" :key="todo.id" :todo="todo" />
  </el-checkbox-group>
</template>

<script>
import { useStore } from 'vuex';
import Item from './Item.vue';

export default {
  name: 'List',
  components: {
    Item,
  },
  props: {
    todos: Array,
    checkAll: Boolean,
    isIndeterminate: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();

    const handleCheckedChange = (doneTodos) => {
      store.commit('todos/updateTodo', { doneTodos });
      const checkedCount = doneTodos.length;
      emit('update:checkAll', checkedCount === props.todos.length);
      emit('update:isIndeterminate', checkedCount > 0 && checkedCount < props.todos.length);
    }

    return {
      handleCheckedChange,
    }
  }
}
</script>

<style scoped>
.el-checkbox-group {
  display: grid;
}
</style>
