const TODOS = [
  { id: "1638256190206", name: "敲代码", done: true },
  { id: "1638256191770", name: "整理笔记", done: false },
  { id: "1638256193996", name: "吃饭", done: false },
];
const DONETODOS = ["1638256190206"];

const state = {
  todos: JSON.parse(JSON.stringify(TODOS)),
  doneTodos: JSON.parse(JSON.stringify(DONETODOS)),
};
// getters
const getters = {
  todosLen: (state) => {
    return state.todos.length;
  },
  doneTodosLen: (state) => {
    return state.doneTodos.length;
  },
  // 选中 todo 按钮删除状态
  isDone: (state) => state.todos.some((todo) => todo.done),
};
// mutations
const mutations = {
  // 更新 doneTodos
  updateDoneTodos(state) {
    state.doneTodos = state.todos.reduce((result, todo) => {
      todo.done && result.push(todo.id);
      return result;
    }, []);
  },
  // 添加 todo
  addTodo(state, { todoObj = {} }) {
    state.todos.unshift(todoObj);
  },
  // 更新 todo
  updateTodo(state, { doneTodos = [] }) {
    state.doneTodos = doneTodos;
    state.todos = Array.from(state.todos, (todo) => ({
      ...todo,
      done: doneTodos.includes(todo.id),
    }));
  },
  // 删除 todo
  deleteTodo(state, { id }) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
    state.doneTodos.splice(state.doneTodos.indexOf(id), 1);
  },
  // 全选
  checkAllTodo(state, checked) {
    state.todos = Array.from(state.todos, (todo) => ({
      ...todo,
      done: checked,
    }));
  },
  // 反选
  reverseTodoDone(state) {
    state.todos = state.todos.map((todo) => {
      todo.done = !todo.done;
      return todo;
    });
  },
  // 重置
  resetTodos(state) {
    state.todos = JSON.parse(JSON.stringify(TODOS));
    state.doneTodos = JSON.parse(JSON.stringify(DONETODOS));
  },
  // 清除已完成
  clearAllDoneTodo(state) {
    state.todos = state.todos.filter((todo) => !todo.done);
  },
};
// actions
const actions = {
  // 名称重复校验
  checkName({ state }, name) {
    return new Promise((reslove) => {
      reslove(state.todos.some((todo) => todo.name === name));
    });
  },
  // 全选
  checkAll({ commit }, checked) {
    commit("checkAllTodo", checked);
    commit("updateDoneTodos");
  },
  // 反选
  reverseCheck({ commit }) {
    commit("reverseTodoDone");
    commit("updateDoneTodos");
  },
  // 异步重置数据
  resetTodos({ commit }) {
    return new Promise((reslove) => {
      setTimeout(() => {
        commit("resetTodos");
        reslove(false);
      }, 1500);
    });
  },
  // 清除已完成
  clearAllDone({ commit }) {
    commit("clearAllDoneTodo");
    commit("updateDoneTodos");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
