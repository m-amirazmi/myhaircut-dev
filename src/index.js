import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/main.scss'
import App from './components/App'
import { AuthProvider } from './contexts/AuthContext'
import { DBUserProvider } from './contexts/DBUserContext'

export function Main() {
  return (
    <AuthProvider>
      <DBUserProvider>
        <App />
      </DBUserProvider>
    </AuthProvider>
  )
}

ReactDOM.render(<StrictMode><Main /></StrictMode>, document.getElementById('root'))
