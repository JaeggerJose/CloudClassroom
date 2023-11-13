import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Ship() {
    const location = useLocation()
    const navigate = useNavigate()
    React.useEffect(() => {
        setTimeout(()=> {
            navigate('/about', {replace: true})
        }, 3000)
    }, [])
    
    return (
        <div>Ship</div>
    )
}

export default Ship