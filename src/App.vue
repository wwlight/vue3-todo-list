<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos';
import Header from './components/Header.vue';
import List from './components/List.vue';
import Footer from './components/Footer.vue';

const todosStore = useTodosStore()
const checkAll = ref(false);
const isIndeterminate = ref(true);
const isReset = ref(false);

// 重置
const handleResetAndRefresh = async () => {
  checkAll.value = false;
  isIndeterminate.value = true;
  isReset.value = true;
  isReset.value = await todosStore.resetTodos();
}
</script>

<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="10" :md="10" :lg="10">
      <Header v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate"  />
      <el-card :body-style="{ padding: '10px' }">
        <template v-if="todosStore.todosLen !== 0">
          <List v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate" />
          <el-divider style="margin:10px 0" />
          <Footer v-model:checkAll="checkAll" v-model:isIndeterminate="isIndeterminate" />
        </template>
        <el-empty v-else>
          <template #description />
          <el-button type="primary" :loading="isReset" @click="handleResetAndRefresh">重置刷新</el-button>
        </el-empty>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
body {
  box-sizing: border-box;
  min-width: 340px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-tap-highlight-color: transparent;
}
</style>
