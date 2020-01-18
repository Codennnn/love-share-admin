import { getTodoList } from '@/request/api/admin'

const state = {
  todoList: [
    {
      _id: 1,
      title: '...',
      content: '123',
      is_one: true,
      is_important: true,
      is_starred: false,
      is_trashed: false,
      tags: [1, 2],
    },
  ],
  currentSelected: {},
}

const mutations = {
  SET_CURRENT_SELECTED(state, selected) {
    state.currentSelected = selected
  },
  SET_TODO_LIST(state, list) {
    state.todoList = list
  },
}

const actions = {
  async getTodoList({ commit }) {
    const { code, data } = await getTodoList()
    if (code === 2000) {
      commit('SET_TODO_LIST', data.todo_list)
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
    filterItems: state => ({ type, value }) => {
      console.log(type, value)
      if (type === 'filter') {
        return state.todoList.filter(el => el[value])
      }
      if (type === 'tag') {
        return state.todoList.filter(el => el.tags.includes(value))
      }
      return state.todoList.filter(el => !el.is_trashed)
    },
  },
}
