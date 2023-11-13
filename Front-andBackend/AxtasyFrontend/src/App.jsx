import './App.scss'
import TheHeader from './Layout/TheHeader.jsx'
import { Routes, Route } from "react-router-dom"
import TheContent from './Layout/TheContent.jsx'

// import Home from './pages/Home.jsx'
import UserGuide from './pages/UserGuide'
import System from './pages/System.jsx'
// import Login from './pages/Login.jsx'
import LabSystem from './pages/LabSystem'
import ManagerAdmin from './pages/ManagerAdmin'
import ManagerLabAdmin from './pages/ManagerLabAdmin'
import Unauthorized from './pages/Unauthorized'
// import Require from './components/Require'
import Require2 from './components/Require2'

import BaseRedirect from './pages/BaseRedirect'

import Top from './components/Top'
import { LabDataPorvider } from './utils/labsystem'
import { useEffect, useState } from 'react'

import Login from './components/Login'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function App() {
    
    const [ auth ] = useState(localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)
    let navigate = useNavigate();
    useEffect(() => {
        if(!auth) {
            navigate('/login')
        }
    }, [auth]);
    
    return (

        <div>
            { auth? 
         <div>
            <TheHeader></TheHeader>
            <TheContent>
                <Top>
                    <Routes>
                        <Route element={<Require2 level="3"/>}>
                            <Route path="/" element={<BaseRedirect />} />
                            <Route path="userguide" element={<UserGuide />} />
                            <Route path="unauthorized" element={<Unauthorized />} level="1" />
                        </Route>
                        <Route element={<Require2  level="1"/> }>
                            <Route path="manageadmin" element={<ManagerAdmin />}  />
                        </Route>
                        <Route element={<Require2  level="2"/> }>
                            <Route path="managelabadmin" element={<ManagerLabAdmin />}   />
                        </Route>
                        <Route element={<Require2  level="3"/> }>
                            <Route path="system" element={<System/>}  />
                        </Route>
                        <Route element={<Require2  level="3"/> }>
                                <Route path="labsystem" element={
                            <LabDataPorvider>
                            <LabSystem />
                            </LabDataPorvider>
                            }/>
                        </Route>
                    </Routes>
                </Top>
            </TheContent>
            </div>
            :
            <>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>

            </>
        }
        </div>
    )
}

export default App
