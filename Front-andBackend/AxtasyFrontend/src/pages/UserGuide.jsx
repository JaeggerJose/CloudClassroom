import React from 'react'
import GuideAdmin from '../components/guide/GuideAdmin'
import { BsArrowDown } from 'react-icons/bs'
import GuideLabadmin from '../components/guide/GuideLabadmin'
import GuideUser from '../components/guide/GuideUser'
import GuideCreateTask from '../components/guide/GuideCreateTask'
import useAuth from '../hook/useAuth'

function UserGuide() {
    const { auth } = useAuth()
    const admin = React.useRef()
    const labadmin = React.useRef()
    const user = React.useRef()
    const createtask = React.useRef()

    return (
        <div className="user-guide">
            <h1>使用導覽</h1>
            <section className="category">
                <div className="wrapper">
                    {
                    auth.level === 1 && 
                    <div className="box">
                        <h2>管理者</h2>
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: createtask.current.ref1.current.offsetTop - 80
                            })
                        }}>建立新任務</p>
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: admin.current.ref1.current.offsetTop - 80
                            })
                        }}>新增查閱管理實驗室管理者</p>
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: user.current.ref1.current.offsetTop - 80
                            })
                        }}>查看任務總覽</p>
                    </div>
                    }
                    {
                    auth.level === 2 && 
                    <div className="box">
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: createtask.current.ref1.current.offsetTop - 80
                            })
                        }}>建立新任務</p>
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: labadmin.current.ref1.current.offsetTop - 80
                            })
                        }}>新增查閱使用者</p>
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: user.current.ref1.current.offsetTop - 80
                            })
                        }}>查看任務總覽</p>
                    </div>
                    }
                    {
                    auth.level === 3 && 
                    <>
                    <h2>一般使用者功能列表</h2>
                    <div className="box">
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: createtask.current.ref1.current.offsetTop - 80
                            })
                        }}>建立新任務</p>
                        <p className="behavior" onClick={() => {
                            window.scrollTo({
                                'behavior': 'instant', top: user.current.ref1.current.offsetTop - 80
                            })
                        }}>查看任務總覽</p>
                    </div>
                    </>
                    }
                </div>
            </section>
            {/* <section className="move">
                <div className="arrow">
                    <BsArrowDown size={40} />
                </div>
            </section> */}
            <GuideCreateTask ref={createtask} />
            <div className="blank"></div>
            {auth.level === 1 && <GuideAdmin ref={admin}/>}
            {auth.level === 2 && <GuideLabadmin ref={labadmin} />}
            <GuideUser ref={user} />
            
          
        </div>
    )
}

export default UserGuide