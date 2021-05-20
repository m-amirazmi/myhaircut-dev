import Auth from '../components/pages/Auth'
import Home from '../components/pages/Home'

export const routes = [
  // CUSTOMERS
  { path: '/customer/login', pathname: 'Login', protected: false, showOnNavbar: true, showOnSidebar: false, component: Auth },
  { path: '/customer/register', pathname: 'Register', protected: false, showOnNavbar: true, showOnSidebar: false, component: Auth },
  { path: '/customer/home', pathname: 'Register', protected: true, showOnNavbar: true, showOnSidebar: false, component: Home },
  // BARBERS
  { path: '/barber/login', pathname: 'Barber Login', protected: false, showOnNavbar: true, showOnSidebar: false, component: Auth },
  { path: '/barber/register', pathname: 'Barber Register', protected: false, showOnNavbar: true, showOnSidebar: false, component: Auth },
  // ADMINS
  { path: '/admin/login', pathname: 'Admin Login', protected: false, showOnNavbar: true, showOnSidebar: false, component: Auth },
]