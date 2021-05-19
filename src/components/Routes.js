import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../utils/routes'

export default function Routes() {

  const renderRoutes = () => routes.map((route) => <Route key={route.path} exact path={route.path} component={route.component} />)

  return (
    <Switch>
      {renderRoutes()}
      <Redirect from='*' to='/login' />
    </Switch>
  )
}
