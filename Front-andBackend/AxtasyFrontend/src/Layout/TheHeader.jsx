import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
import { Turn as Hamburger } from 'hamburger-react'
import SingupLink from '../components/header/Singuplink'
import useAuth from '../hook/useAuth'
import axios from 'axios'
import { HiUserCircle } from 'react-icons/hi'

function TheHeader() {
    const [isOpen, setOpen] = React.useState(false)
    const [menu, setMenu] = React.useState(false)
    const navigate = useNavigate()

    // const isUser = useUser()
    const { auth, setAuth, handleLogout } = useAuth()
    return (
        <header>
            <div className="header-inner">
                    <div className="logo">
                        <Link to="/" onClick={() => {
                            setMenu(false)
                            setOpen()
                        }}>
                            Axtasy
                        </Link>
                    </div>
                    <div className="ham">
                        <Hamburger
                            toggled={isOpen}
                            toggle={setOpen}
                            onToggle={() => {
                                setMenu((p)=>!p)
                            }}
                        />
                    </div>

                    {/* small */}
                    <nav className={`menu-small ${menu ? 'menu-show': '' }`} >
                        <ul className="nav-list">
                             <li className="">
                                <Link to="/" onClick={() => {
                                    setMenu((p)=>!p)
                                    setOpen()
                                }}>
                                    首頁
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/about" onClick={() => {
                                    setMenu((p)=>!p)
                                    setOpen()
                                }}>
                                    關於Axtasy                 
                                </Link>
                            </li>
                            {
                                auth?.auth && auth.level >= 1 && (
                                    <li className="">
                                        <Link to="/manageadmin" onClick={() => {
                                                setMenu((p)=>!p)
                                                setOpen()
                                        }}>
                                            Admin
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth && auth.level === 2 && (
                                    <li className="">
                                        <Link to="/managelabadmin" onClick={() => {
                                                setMenu((p)=>!p)
                                                setOpen()
                                        }}>
                                            Lab Admin
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth && (
                                    <li className="">
                                        <Link to="/system" onClick={() => {
                                            setMenu((p)=>!p)
                                            setOpen()
                                        }}>
                                            建立新任務
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth
                                    ? auth.level >= 1 && (
                                        <li className="">
                                            <Link to="/labsystem" onClick={() => {
                                                setMenu((p)=>!p)
                                                setOpen()
                                            }}>
                                                任務總覽
                                            </Link>
                                        </li>
                                    ) : 
                                    null
                            }
                             {
                                !auth?.auth
                                    ?   <li className="">
                                            <Link to="/login" onClick={() => {
                                                setMenu((p)=>!p)
                                                setOpen()
                                            }}>
                                                登入
                                            </Link>
                                        </li>
                                    :   <li>
                                            <Link to="/" onClick={handleLogout}>
                                                登出
                                            </Link>
                                        </li>
                             }
                             {
                                !auth?.auth
                                    ? <li className="">
                                        <SingupLink setMenu={setMenu} setOpen={setOpen}/>
                                    </li>
                                    : ''
                             }
                            
                        </ul>
                       
                    </nav>

                    {/* big */}
                    <nav className={`menu`} >
                        <ul className="nav-list">
                            {/* <li className="">
                                <Link to="/">
                                    首頁
                                </Link>
                            </li> */}
                            {
                                auth?.auth && 
                                (
                                    <li className="">
                                        <Link to="/userguide">
                                            使用導覽
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth && auth.level === 1 && 
                                (
                                    <li className="">
                                        <Link to="/manageadmin">
                                            新增實驗室管理者
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth && auth.level === 2  &&
                                 (
                                    <li className="">
                                        <Link to="/managelabadmin">
                                            新增使用者
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth && (
                                    <li className="">
                                        <Link to="/system">
                                            建立新任務
                                        </Link>
                                    </li>
                                )                          
                            }
                            {
                                auth?.auth
                                    ? auth.level >= 1 && (
                                        <li className="">
                                            <Link to="/labsystem">
                                                任務總覽
                                            </Link>
                                        </li>
                                    ) : 
                                    null
                            }
                            {
                                auth?.auth 
                                    ? <li className="logout">
                                        <a onClick={handleLogout}>
                                            登出
                                        </a>
                                        
                                     </li>
                                    : null
                            }
                            {
                                auth?.auth
                                    ? <span><HiUserCircle />{auth.level === 1
                                                ? 'admin'
                                                :auth.level ===2
                                                    ? 'labAdmin'
                                                    : 'user'
                                            }</span>
                                    : null
                            }
                        </ul>
                    </nav>
                </div>
        </header>
    )
}

export default TheHeader
