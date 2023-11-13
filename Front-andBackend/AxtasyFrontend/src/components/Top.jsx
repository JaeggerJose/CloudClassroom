import React from 'react'
import { useLocation } from 'react-router-dom'

function Top({children}) {
    const location = useLocation()

    React.useEffect(() => {
        window.scroll( {
            top: 0,
            behavior: "instant"
        })
    }, [location])

    return (
        <>{children}</>
    )
}

export default Top