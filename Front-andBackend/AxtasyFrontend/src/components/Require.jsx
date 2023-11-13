import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import axios from 'axios'
import useAuth from '../hook/useAuth'
import useUser from '../hook/useUser'

function Require({level}) {
    const { auth, setAuth } = useAuth()
    const state = useUser()
    const location = useLocation()
    
    React.useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: process.env.REACT_APP_USER,
                    withCredentials: true,
                })
                setAuth({...response.data, auth: true})
                
            } catch (err) {
            }
            
        }
        state && !auth?.auth  && getToken(); 
    }, [auth, setAuth, state])
    return (
        state
            ? auth?.auth
                ? <Outlet />
                : <div>Loading</div>
            : (location.pathname === '/system' || location.pathname ==='/labsystem')
                ? <Navigate to="/login" />
                : <Outlet />
    )
}

export default Require