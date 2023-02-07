<script setup lang="ts">
import type { PropType } from 'vue';
import { useTodosStore } from '@/stores/todos';
import { Delete } from '@element-plus/icons-vue'

interface todoItme {
    id: string,
    name: string,
    done: boolean,
}

const todosStore = useTodosStore();
const props = defineProps({
    todo: {
        type: Object as PropType<todoItme>,
        default: () => ({})
    }
})

const deleteTodo = (id: string) => {
    todosStore.deleteTodo(id);
}
</script>

<template>
    <el-checkbox :label="props.todo.id">
        {{ props.todo.name }}
        <el-button v-if="props.todo.done" class="todo-del-icon" type="danger" :icon="Delete" circle
            @click.stop="() => deleteTodo(props.todo.id)" />
    </el-checkbox>
</template>

<style scoped lang="scss">
.el-checkbox {
    width: 100%;
    padding: 5px 10px;
    margin-top: 10px;
    margin-right: 0;
    font-size: 16px !important;
    display: flex;
    align-items: center;
    position: relative;

    &:first-of-type {
        margin-top: 0;
    }

    &:hover {
        background: var(--el-fill-color-light);
        border-radius: var(--el-border-radius-base);
    }

    :deep(.el-checkbox__label) {
        width: 100%;
    }

    .todo-del-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>