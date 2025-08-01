import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
function useAuth({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [id, setId] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const id = localStorage.getItem('id')

    if (user && token) {
      setUser(user)
      setId(id)
      setToken(token)
    } else {
      setUser(null)
      setId(null)
      setToken(null)
    }
    setIsLoggedIn(true)
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        setToken,
        setUser,
        setIsLoggedIn,
        token,
        user,
        isLoggedIn,
        setId,
        id
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default useAuth
