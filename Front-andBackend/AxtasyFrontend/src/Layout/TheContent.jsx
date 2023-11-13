import React from 'react'

function TheContent(props) {
    return (
        <main className="content-area">
            {props.children}
        </main>
    )
}

export default TheContent