import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const register = (email, password) => auth.createUserWithEmailAndPassword(email, password)
  const login = (email, password) => auth.signInWithEmailAndPassword(email, password)
  const logout = () => auth.signOut()
  const resetPassword = (email) => auth.sendPasswordResetEmail(email)
  const updateEmail = (email) => currentUser.updateEmail(email)
  const updatePassword = (password) => currentUser.updatePassword(password)
  const updateProfile = (profile) => currentUser.updateProfile(profile)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = { currentUser, login, register, logout, resetPassword, updateEmail, updatePassword, updateProfile }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}