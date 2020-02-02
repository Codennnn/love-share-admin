import { getCategoryList } from '@/request/api/category'
import { getSchoolList } from '@/request/api/school'

const actions = {
  async getCategoryList({ commit }) {
    const { code, data } = await getCategoryList()
    if (code === 2000) {
      commit('SET_CATEGORY_LIST', data.category_list)
    }
  },

  async getSchoolList({ commit }) {
    const { code, data } = await getSchoolList()
    if (code === 2000) {
      commit('SET_SCHOOL_LIST', data.school_list)
    }
  },
}

export default actions
