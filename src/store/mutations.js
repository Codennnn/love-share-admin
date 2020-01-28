const mutations = {
  SET_THEME_STYLE(state, style) {
    localStorage.setItem('theme_style', style)
    state.themeStyle = style
  },
  SET_MENU_THEME(state, theme) {
    localStorage.setItem('menu_theme', theme)
    state.menuTheme = theme
  },
  SET_NAV_TYPE(state, type) {
    localStorage.setItem('navbar_type', type)
    state.navbarType = type
  },
  SWITCH_SIDEBAR_COLLAPSE(state, status) {
    localStorage.setItem('sidebar_collapse', status)
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
