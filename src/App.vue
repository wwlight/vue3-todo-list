<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="10" :md="10" :lg="10">
      <Header v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate" :updateState="updateState" />
      <el-card :body-style="{ padding: '10px' }">
        <template v-if="$store.state.todos.todos.length !== 0">
          <List :todos="$store.state.todos.todos" v-model:checkAll="checkAll"
            v-model:isIndeterminate="isIndeterminate" />
          <el-divider style="margin:10px 0" />
          <Footer v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate" :updateState="updateState" />
        </template>
        <el-empty v-else>
          <template #description />
          <el-button type="primary" :loading="isReset" @click="handleResetAndRefresh">重置刷新</el-button>
        </el-empty>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';
import List from './components/List.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    const store = useStore();
    const checkAll = ref(false);
    const isIndeterminate = ref(true);
    const isReset = ref(false);

    // 重置
    const handleResetAndRefresh = async () => {
      checkAll.value = false;
      isIndeterminate.value = true;
      isReset.value = true;
      isReset.value = await store.dispatch('todos/resetTodos');
    }
    // 更新全选按钮状态
    const updateState = (_sotre, _emit) => {
      const todosLen = _sotre.getters['todos/todosLen'];
      const doneTodosLen = _sotre.getters['todos/doneTodosLen'];
      _emit('update:checkAll', doneTodosLen === todosLen);
      _emit('update:isIndeterminate', doneTodosLen > 0 && doneTodosLen < todosLen);
    }
    return {
      checkAll,
      isIndeterminate,
      isReset,
      handleResetAndRefresh,
      updateState,
    }
  }
}
</script>

<style>
body {
  box-sizing: border-box;
  min-width: 340px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}
</style>
