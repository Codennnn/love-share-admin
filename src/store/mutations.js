const mutations = {
  SET_LOCKED(state, isLocked) {
    state.isLocked = isLocked
  },
  SET_THEME_STYLE(state, theme) {
    state.themeStyle = theme
  },
  SET_MENU_THEME(state, theme) {
    state.menuTheme = theme
  },
  SET_NAV_TYPE(state, type) {
    state.navbarType = type
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
