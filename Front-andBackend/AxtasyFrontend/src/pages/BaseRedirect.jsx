import React from 'react'
import useAuth from '../hook/useAuth'
import ManagerAdmin from './ManagerAdmin'
import ManagerLabAdmin from './ManagerLabAdmin'
import System from './System.jsx'

function BaseRedirect() {
    const { auth } = useAuth()

    return (
        auth.level === 1
            ? <ManagerAdmin/>
            : auth.level === 2
                ? <ManagerLabAdmin />
                : <System />
    )
}

export default BaseRedirect