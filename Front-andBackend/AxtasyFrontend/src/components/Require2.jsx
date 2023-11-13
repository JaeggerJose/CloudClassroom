import axios from 'axios'
import React, {useEffect} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'

function Require2({level}) {
    const [ data, setData ] = useState(localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)

    
    useEffect(() => {
        /*if (process.env.NODE_ENV === 'development') {
            setAuth({level: 2, auth: true, email: 'top@gmail.com', username: 'James', labname: 'yanglab'})
            
        } else {*/
            const getCurrentUser = async () => {
                //const data = jwtDecode(localStorage.getItem('token'))
                setData({level: data.level, auth: data.auth, email: data.email, username: data.username, labname: data.labname})
            }
            getCurrentUser()
        //}
    }, [])

    return (
        
        data?.auth
            ? level >= data.level 
                ? <Outlet />
                : <Navigate to="/system" replace={true} />
            : <></>
            // : <Navigate to="/" replace={true} />
    )
}

export default Require2