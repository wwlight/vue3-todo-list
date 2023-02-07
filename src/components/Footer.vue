<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos';
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
    checkAll: {
        type: Boolean,
        default: false,
    },
    isIndeterminate: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['update:checkAll', 'update:isIndeterminate']);
const todosStore = useTodosStore();

const checked = ref(false);

const checkAllTodo = (checked: any): void => {
    todosStore.checkAll(checked);
    emit('update:checkAll', checked);
    emit('update:isIndeterminate', false);
}
// 反选
const reverseCheck = () => {
    todosStore.reverseCheck();
    updateState();
}
// 清除已完成
const clearAllDone = () => {
    todosStore.clearAllDone();
    updateState();
}
// 更新全选按钮状态
function updateState() {
    emit('update:checkAll', todosStore.checkAllBool);
    emit('update:isIndeterminate', todosStore.isIndeterminate);
}
</script>

<template>
    <div class="footer-wrapper">
        <el-checkbox border :model-value="props.checkAll" :indeterminate="props.isIndeterminate"
            @change="checkAllTodo">全选
        </el-checkbox>
        <el-checkbox v-model="checked" border @change="reverseCheck">反选</el-checkbox>
        <el-alert :title="`已完成 ${todosStore.doneTodosLen} / 全部 ${todosStore.todosLen}`" type="info" :closable="false" />
        <el-button v-if="todosStore.isDone" class="todo-del-icon" type="danger" :icon="Delete" circle
            @click="clearAllDone" />
    </div>
</template>

<style scoped lang="scss">
.footer-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.el-checkbox {
    margin-right: 10px;
}

:deep(.el-alert) {
    max-width: 120px;
    white-space: nowrap;
    justify-content: center;
    margin-left: auto;
    padding: 8px;

    .el-alert__content {
        padding: 0 !important;
        text-align: center;
    }
}

.el-button {
    margin: 0 10px;
}
</style>