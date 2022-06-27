<template>
    <div class="footer-wrapper">
        <el-checkbox border :model-value="checkAll" :indeterminate="isIndeterminate" @change="checkAllTodo">全选
        </el-checkbox>
        <el-checkbox v-model="checked" border @change="reverseCheck">反选</el-checkbox>
        <el-alert :title="`已完成 ${$store.getters['todos/doneTodosLen']} / 全部 ${$store.getters['todos/todosLen']}`"
            type="info" :closable="false" />
        <el-button v-if="$store.getters['todos/isDone']" class="todo-del-icon" type="danger" :icon="Delete" circle
            @click="clearAllDone" />
    </div>
</template>
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Delete } from '@element-plus/icons-vue'

export default {
    name: 'Footer',
    props: {
        checkAll: Boolean,
        isIndeterminate: Boolean,
        updateState: Function,
    },
    emits: ['update:checkAll', 'update:isIndeterminate'],
    setup(props, { emit }) {
        const store = useStore();
        const checked = ref(false);

        const checkAllTodo = (checked) => {
            store.dispatch('todos/checkAll', checked);
            emit('update:checkAll', checked);
            emit('update:isIndeterminate', false);
        }
        // 反选
        const reverseCheck = () => {
            store.dispatch('todos/reverseCheck');
            props.updateState(store, emit);
        }
        // 清除已完成
        const clearAllDone = () => {
            store.dispatch('todos/clearAllDone');
            props.updateState(store, emit);
        }
        return {
            Delete,
            checked,
            checkAllTodo,
            reverseCheck,
            clearAllDone,
        }
    }
}
</script>
<style scoped>
.footer-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.el-checkbox {
    margin-right: 10px;
}

.el-alert {
    max-width: 120px;
    white-space: nowrap;
    justify-content: center;
    margin-left: auto;
    padding: 8px;
}

:deep(.el-alert .el-alert__content) {
    padding: 0 !important;
    text-align: center;
}

.el-button {
    margin: 0 10px;
}
</style>