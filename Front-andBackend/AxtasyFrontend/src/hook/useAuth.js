import { useContext } from 'react'
import AuthContext from '../utils/Auth'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth