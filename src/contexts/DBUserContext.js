import { createContext, useContext } from "react"
import { db } from "../utils/firebase"

const DBUserContext = createContext()

export const useDBUser = () => useContext(DBUserContext)

export const DBUserProvider = ({ children }) => {

  const saveUser = (type, branch, data) => {
    const uploadData = { ...data }
    delete uploadData.uid
    return db.collection(branch).doc(data.uid)[type](uploadData)
  }

  const value = { saveUser }

  return (
    <DBUserContext.Provider value={value}>
      {children}
    </DBUserContext.Provider>
  )
}
