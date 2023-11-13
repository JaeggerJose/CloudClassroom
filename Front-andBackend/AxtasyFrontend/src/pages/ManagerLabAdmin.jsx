import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import useAuth from '../hook/useAuth'
import PasswordBoxUser from '../components/PasswordBoxUser'
import useCookie from '../hook/useCookie'

function ManagerLabAdmin() {
    const { register, handleSubmit } = useForm()
    const {auth} = useAuth()
    const cookie = useCookie('csrftoken')
    
    const [labuserList, setlabuserList] = useState('')

    // only for control addeventlistener
    const [popoverspassword, setPopoversPassword] = useState(false)
    // pass props
    const [usernamelab, setusernamelab] = useState('')
    
    const [reload, setReload] = useState(false)

    const onSubmit = async data => {
        try {
            const response = await axios({
                method: 'POST',
                url: "http://173.16.3.37:8000/createuser/",
                data: {
                    ...data, level: auth.level,
                },
                headers: {
                    'X-CSRFToken': cookie,
                }
            })
            setlabuserList((p) => ([...p, { username: data.username}]))
            setReload(p => !p)
        } catch (error) {
            // name or email repeat
        }
       
    }
    const outsidehandler = (e) => {
        e.stopPropagation()
        setPopoversPassword(p=>!p)
        setusernamelab(false)
        document.removeEventListener("click", outsidehandler, false)
    }

    const changepassword = (e, item) => {
        e.stopPropagation()

        if (!popoverspassword) {
            document.addEventListener("click", outsidehandler, false)
        } else {
            document.removeEventListener("click",outsidehandler, false)
        }
        //  passwordBox state
        setPopoversPassword(p=>!p)

        setusernamelab(item.name)
    }
    
    useEffect(() => {
            const getusername = async () => {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'http://localhost:8000/userlist/',
                        data: {'lab':auth.username},

                    })
                    // []
                    setlabuserList(response.data)
                } catch (err) {
                }
            }
            getusername()
        //}
    }, [reload])
    
    return (
        <div className="manager">
            <div className="mainarea">
                <div className="managearea">
                    <h5 className="usertype">實驗室管理員 {auth.username}</h5>
                    <div className="inputarea">
                        <div className="left">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h5>新增使用者</h5>
                                <div className="inputfield">
                                    <label className="form-label" htmlFor="username">Name and LDAP Name</label>
                                    <input
                                        className="form-control"
                                        type="text" id="username"
                                        {...register('username')}
                                    />
                                </div>
                                <div className="inputfiled-sep"></div>
                                <div className="inputfield">
                                    <label className="form-label" htmlFor="email">email</label>
                                    <input className="form-control" type="text" id="email" {...register('email')}/>
                                </div>
                                <div className="inputfiled-sep"></div>
                                <div className="inputfield">
                                    <label className="form-label" htmlFor="password">password</label>
                                    <input className="form-control" type="password" id="password" {...register('password')}/>
                                </div>
                                <div className="inputfiled-sep"></div>
                                <button className="btn btn-primary">提交</button>
                            </form>
                        </div>

                        <div className="add-list-line"></div>

                        <div className="right">
                            <h4>使用者列表</h4>
                            <div className="lab-lists">
                                <div className="lab-list__column-name">
                                    <div className="no">No</div>
                                    <div className="labname">使用者名稱</div>
                                    <div className="del">刪除</div>
                                    <div className="changepassword">密碼設定</div>
                                    {/* <div className="changepassword">停用</div> */}
                                </div>
                                {!labuserList
                                    ? <></>
                                    : 
                                    labuserList.map((item, index) => {
                                        return (
                                            <div className="lab-list" key={index}>
                                                <div className="lab-list__number">{index + 1}</div>
                                                <div className="lab-list__labname">{item.name}</div>
                                                <div className="lab-list__del">
                                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                                        const removelabadminuser = async () => {
                                                            const response = await axios({
                                                                method: 'DELETE',
                                                                url: 'http://localhost:8000/userdelete/',
                                                                data: {
                                                                    name: item.name, email: item.email,
                                                                }
                                                            })
                                                            setReload(p => !p)
                                                        }
                                                        removelabadminuser()
                                                        // setlabuserList(p => p.filter(i => i.name !== item.name))
                                                    }}>刪除</button>
                                                </div>
                                                <div className="lab-list__password">
                                                    <div className="lab-list__password__button">
                                                        <button className="btn btn-secondary btn-sm" onClick={(e) => changepassword(e, item)}>改密碼</button>
                                                        <PasswordBoxUser item={item} usernamelab={usernamelab} setusernamelab={setusernamelab} popoverspassword={popoverspassword} changepassword={changepassword}/>
                                                    </div>  
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                {/* 
                                <div className="lab-list">
                                    <div className="lab-list__number">1.</div>
                                    <div className="lab-list__labname">cclab</div>
                                    <div className="lab-list__del">
                                        <button className="btn btn-danger">刪除</button>
                                    </div>
                                    <div className="lab-list__password">
                                        <button className="btn btn-secondary">改密碼</button>
                                    </div>
                                </div>
                                <div className="lab-list">
                                    <div className="lab-list__number">2.</div>
                                    <div className="lab-list__labname">yanglab</div>
                                    <div className="lab-list__del">
                                        <button className="btn btn-danger">刪除</button>
                                    </div>
                                    <div className="lab-list__password">
                                        <button className="btn btn-secondary">改密碼</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerLabAdmin
