const todoListStore = {
    namespaced: true,
    state: () => ({
        todoList: [],
        activeTab: 'all',
    }),
    mutations: {
        addTodoList(state, todoName) {
            const alreadyExist = state.todoList.find((element) => element.todo === todoName);
            if (alreadyExist) return;

            state.todoList = [...state.todoList, {todo: todoName, completed: false}];
        },
        completeTodoList(state, todo) {
            state.todoList.forEach(element => {
                if (element.todo === todo) {
                    element.completed = !element.completed;
                }
            });
        },
        changeActiveTab(state, tab) {
            state.activeTab = tab;
        }
    },
    getters: {
        getCompletedTodos({todoList}) {
            return todoList.filter((todo) => todo.completed)
        },

        getUncompletedTodos({todoList}) {
            return todoList.filter((todo) => !todo.completed)
        },

        getAllTodos(state) {
            return state.todoList;
        },

        getTodosBySelectedTab({activeTab}, getters) {
            if (activeTab === 'all') return getters.getAllTodos;
            if (activeTab === 'completed') return getters.getCompletedTodos;
            if (activeTab === 'uncompleted') return getters.getUncompletedTodos;
        },
        getActiveTab({activeTab}) {
            return activeTab;
        },
    },
};

export default todoListStore;
