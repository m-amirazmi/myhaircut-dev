import { Redirect, Route, Switch } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { routes } from '../utils/routes'

export default function Routes() {

  const { currentUser } = useAuth()

  const renderRoutes = () => routes.map((route) => !route.protected && <Route key={route.path} exact path={route.path} component={route.component} />)
  const renderProtectedRoutes = () => routes.map((route) => !!currentUser === route.protected && <Route key={route.path} exact path={route.path} component={route.component} />)
  const renderProtetedRedirect = () => !!currentUser ? <Redirect from='*' to='/customer/home' /> : <Redirect from='*' to='/customer/login' />

  return (
    <Switch>
      {renderRoutes()}
      {renderProtectedRoutes()}
      {renderProtetedRedirect()}
    </Switch>
  )
}
