<template>
    <el-checkbox :label="todo.id">
        {{ todo.name }}
        <el-button
            v-if="todo.done"
            class="todo-del-icon"
            type="danger"
            size="mini"
            :icon="Delete"
            circle
            @click.stop="() => deleteTodo(todo.id)"
        />
    </el-checkbox>
</template>

<script>
import { Delete } from '@element-plus/icons';
import { useStore } from 'vuex';

export default {
    name: 'Item',
    props: {
        todo: {
            type: Object,
            default: () => ({}),
        }
    },
    setup() {
        const store = useStore();
        const deleteTodo = (id) => {
            store.commit({ type: 'todos/deleteTodo', id });
        }
        return {
            deleteTodo,
            Delete
        }
    }
}
</script>

<style scoped>
.el-checkbox {
    margin-right: 0;
    padding: 0 10px;
    font-size: 16px !important;
}
.el-checkbox:hover {
    background: var(--el-bg-color-base);
    border-radius: var(--el-alert-border-radius-base);
}
.todo-del-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
</style>