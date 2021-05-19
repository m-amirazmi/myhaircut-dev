import Login from '../components/pages/Login'
import Register from '../components/pages/Register'

export const routes = [
  { path: '/login', pathname: 'Login', showOnNavbar: true, showOnSidebar: false, component: Login },
  { path: '/register', pathname: 'Register', showOnNavbar: true, showOnSidebar: false, component: Register },
]