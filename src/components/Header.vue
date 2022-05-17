<template>
    <el-card :body-style="{ padding: '10px' }">
        <el-alert center :closable="false" effect="dark" title="vue3-todo-list" type="success">
            <el-link :underline="false" href="https://github.com/sg996/vue3-todo-list">
                <svg viewBox="0 0 16 16" color="#fff">
                    <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                        fill="currentColor"
                    />
                </svg>
            </el-link>
        </el-alert>
        <el-input
            v-model="todo"
            :disabled="$store.getters['todos/todosLen'] >= 10"
            maxlength="20"
            placeholder="最大长度20，回车进行添加"
            @keyup="handleKeyUp"
        >
            <template #append>
                <el-button :icon="Plus" @click="() => updateTodo(todo)">添加</el-button>
            </template>
        </el-input>
    </el-card>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Plus } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
export default {
    name: 'Header',
    props: {
        checkAll: Boolean,
        isIndeterminate: Boolean,
        updateState: Function,
    },
    emits: ['update:checkAll', 'update:isIndeterminate'],
    setup(props, { emit }) {
        const store = useStore();
        const todo = ref('');
        // 点击添加
        const updateTodo = async (key) => {
            if (store.getters['todos/todosLen'] >= 10) {
                ElMessage.closeAll();
                ElMessage.warning('最多可添加 10 个');
                todo.value = '';
                return;
            }
            if (key.trim() === '') {
                ElMessage.closeAll();
                ElMessage.warning('输入项不能为空');
                return;
            }
            const isRename = await store.dispatch('todos/checkName', key);
            if (isRename) {
                ElMessage.closeAll();
                ElMessage.warning('输入项不能重复');
                return;
            }
            const todoObj = {
                id: String((new Date()).valueOf()),
                name: key,
                done: false,
            };
            store.commit({ type: 'todos/addTodo', todoObj });
            props.updateState(store, emit);
            todo.value = '';
        }
        // 回车进行添加
        const handleKeyUp = (e) => {
            const { keyCode, target } = e;
            const { value } = target;
            if (keyCode !== 13) return;
            updateTodo(value);
        }

        return {
            Plus,
            todo,
            handleKeyUp,
            updateTodo,
        }
    }
}
</script>
<style scoped>
.el-card {
    margin: 10px 0;
}
.el-alert {
    margin-bottom: 10px;
}
:deep(.el-alert .el-alert__content) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
:deep(.el-alert .el-alert__content .el-alert__title) {
    font-size: 18px;
    margin-left: 50%;
    transform: translateX(-50%);
}
:deep(.el-alert .el-alert__content .el-alert__description) {
    margin: 0 -10px 0 auto;
    padding: 0;
}
.el-alert .el-alert__content svg {
    width: 2em;
    height: 2em;
    vertical-align: bottom;
}
</style>