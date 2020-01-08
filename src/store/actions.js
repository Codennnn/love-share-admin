import { getCategoryList } from '@/request/api/category'
import { getSchoolList } from '@/request/api/school'

const actions = {
  async getCategoryList({ commit }) {
    try {
      const { code, data } = await getCategoryList()
      if (code === 2000) {
        commit('SET_CATEGORY_LIST', data.category_list)
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getSchoolList({ commit }) {
    try {
      const { code, data } = await getSchoolList()
      if (code === 2000) {
        commit('SET_SCHOOL_LIST', data.school_list)
      }
    } catch (err) {
      Promise.reject(err)
    }
  },
}

export default actions
