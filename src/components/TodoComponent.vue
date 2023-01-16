<template>
    <h1 class="text-center m-2">Todo List App</h1>
    <hr>
    <div class="d-flex justify-content-center">
        <button @click="changeActiveTab('all')" class="btn btn-outline m-2" :class="{active: activeTab === 'all'}"> Todo List </button>
        <button @click="changeActiveTab('completed')" class="btn btn-outline m-2" :class="{active: activeTab === 'completed'}"> Completed </button>
        <button @click="changeActiveTab('uncompleted')" class="btn btn-outline m-2" :class="{active: activeTab === 'uncompleted'}"> Uncompleted </button>
    </div>

    <input class="form-control m-2" type="text" placeholder="add new todo" v-model="todoModel" @keypress.prevent.enter="addNewTodo()"/>
    <small>Fill input and press enter for add new todo, and doble click for mark as completed</small>

    <div class="todo-list-box" v-for="element in todos" :key="element.todo"> 
        <h3 @dblclick="markAsCompleted(element.todo)" :class="{'deleted': element.completed}" class="m-2">- {{ element.todo }}</h3>
    </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
    name: 'TodoApp',
    setup() {
        const store = useStore();
        const todoModel = ref();

        return {
            // Component data
            todoModel, 
            // Getters
            todos: computed(() => store.getters['todoListStore/getTodosBySelectedTab']),
            activeTab: computed(() => store.getters['todoListStore/getActiveTab']),
            // Mutations
             changeActiveTab: (tab) => store.commit('todoListStore/changeActiveTab', tab),
             markAsCompleted: (todo) => store.commit('todoListStore/completeTodoList', todo),
             addNewTodo: () => store.commit('todoListStore/addTodoList', todoModel.value)
        }
    }
}
</script>

<style scoped>
.todo-list-box {
    border: 3px solid green;
    display: flex;
    flex-direction: column;
    margin: 50px;
    align-items: center;
}

.deleted {
    text-decoration: line-through;
}
</style>