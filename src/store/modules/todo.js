import dayjs from 'dayjs'
import { Message } from 'element-ui'
import {
  getTodoList, addTodo, deleteTodo, updateTodo, updateTodoType,
} from '@/request/api/todo'

const state = {
  showTodoPopup: false,
  todoData: {},
  todoList: [],
  currentSelected: {},
}

const mutations = {
  SET_CURRENT_SELECTED(state, selected) {
    state.currentSelected = selected
  },
  SET_TODO_LIST(state, list) {
    state.todoList = list
  },
  TOGGLE_TAG(state, { id, tag }) {
    state.todoList.some((el) => {
      if (el._id === id) {
        el[tag] = !el[tag]
        return true
      }
      return false
    })
  },
  SET_TODO_POPUP_STATUS(state, { status, data }) {
    state.showTodoPopup = status
    if (data) {
      state.todoData = data
    } else {
      state.todoData = {
        title: '',
        content: '',
        tags: [],
        is_done: false,
        is_important: false,
        is_starred: false,
        is_trashed: false,
        complete_time: [Date.now(), Date.now()],
      }
    }
  },
}

const actions = {
  async getTodoList({ commit }) {
    const { code, data } = await getTodoList()
    if (code === 2000) {
      commit('SET_TODO_LIST', data.todo_list)
    }
  },

  async addTodo({ dispatch }, data) {
    const { code } = await addTodo(data)
    if (code === 2000) {
      dispatch('getTodoList')
    }
  },

  async deleteTodo({ dispatch }, todo_id) {
    const { code } = await deleteTodo({ todo_id })
    if (code === 2000) {
      dispatch('getTodoList')
    }
  },

  async updateTodo({ dispatch }, data) {
    const { code } = await updateTodo(data)
    if (code === 2000) {
      dispatch('getTodoList')
    }
  },

  async updateTodoType({ dispatch, commit }, { todo_id, type, flag }) {
    commit('TOGGLE_TAG', { todo_id, type })
    const { code } = await updateTodoType({ todo_id, type, flag })
    if (code === 2000) {
      if (type === 'is_done' && flag) {
        Message.success('已完成一个任务！')
      }
      dispatch('getTodoList')
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {
    adminId: state => state.info._id,
    filterItems: state => ({ type, value } = {}) => {
      if (type === 'filter') {
        if (value === 'undone') {
          return state.todoList.filter(el => !el.is_done && !el.is_trashed)
        }
        if (value === 'is_trashed') {
          return state.todoList.filter(el => el[value])
        }
        return state.todoList.filter(el => el[value] && !el.is_trashed)
      }
      if (type === 'tag') {
        return state.todoList.filter(el => el.tags.includes(value) && !el.is_trashed)
      }
      return state.todoList.filter(el => !el.is_trashed)
    },
    todayTask: (_, getters) => {
      const allTask = getters.filterItems()
      return allTask.filter((it) => {
        const start = dayjs(it.complete_time[0])
        const end = dayjs(it.complete_time[1])
        return (dayjs().isSame(start, 'day') || dayjs().isAfter(start, 'day'))
          && (dayjs().isSame(end, 'day') || dayjs().isBefore(end, 'day'))
      })
    },
    remainingTask: (_, getters) => getters.todayTask.filter(el => !el.is_done),
  },
}
