const mutations = {
  SET_MENU_THEME(state, theme) {
    state.menuTheme = theme
  },
  SWITCH_SIDEBAR_COLLAPSE(state, status) {
    state.sidebarCollapse = status
  },
  SET_CATEGORY_LIST(state, list) {
    state.categoryList = list
  },
  SET_SCHOOL_LIST(state, list) {
    state.schoolList = list
  },
}

export default mutations
