const state = {
  themeStyle: localStorage.getItem('theme_style') || 'light',
  menuTheme: localStorage.getItem('menu_theme') || 'menu-light',
  navbarType: localStorage.getItem('navbar_type') || 'fixed',
  sidebarCollapse: JSON.parse(localStorage.getItem('sidebar_collapse')) || false,

  categoryList: [],
  schoolList: [],
  security: {
    show: false,
    active: 0,
  },
}

export default state
