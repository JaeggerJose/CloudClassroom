import { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
const AuthContext = createContext({})

export const AuthPorvider = ({children}) => {
    const [auth, setAuth] = useState(localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)
    console.log(auth)
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        setAuth(null)
        window.location.href = '/'
    }


    return (
        <AuthContext.Provider value={{auth, setAuth, handleLogout}}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContext