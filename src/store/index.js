import { createStore } from 'vuex'
import todoListStore from './todoListStore';

export default createStore({
  modules: {
    todoListStore
  }
})
