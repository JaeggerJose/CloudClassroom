import React from 'react'
import { Link } from 'react-router-dom'

function Singup({setMenu, setOpen}) {
    return (
        <Link to="/signup" onClick={() => {
            setMenu((p) => !p)
            setOpen()
        }
        }>註冊</Link>
    )
}

export default Singup
