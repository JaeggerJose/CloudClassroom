import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import useAuth from '../hook/useAuth'
import PasswordBox from '../components/PasswordBox'

function ManagerAdmin() {
    const { register, handleSubmit } = useForm()
    const {auth} = useAuth()

    const [labadminlist, setLabadminlist] = useState('')
    const [popoverspassword, setPopoversPassword] = useState(false)
    const [usernamelabadmin, setUsernamelabadmin] = useState('')

    const [reload, setReload] = useState(false)
    

    const onSubmit = async data => {
       /*if (process.env.NODE_ENV === 'development') {
            try {
                const response = await axios({
                    method: 'POST',
                    url: process.env.REACT_APP_LABADMIN,
                    data: {
                        ...data, level: auth.level,
                    },
                })
                setLabadminlist((p) => ([...p, { usernamelabadmin: data.name}]))
            } catch (error) {
                // name or email repeat
            }
        } else {*/
            try {
                const response = await axios({
                    method: 'POST',
                    //url: process.env.REACT_APP_CREATELABADMIN,
                    data: {
                        ...data,
                    },
                })
                setLabadminlist((p) => ([...p, { usernamelabadmin: data.usernamelabadmin}]))
                setReload(p => !p)
            } catch (error) {
                // name or email repeat
            }
        //}
       
       
    }
    const outsidehandler = (e) => {
        e.stopPropagation()
        setPopoversPassword(p=>!p)
        setUsernamelabadmin(false)
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

        
        setUsernamelabadmin((p) => p === item.name ? false : item.name)
    }
    



    useEffect(() => {
        /*if (process.env.NODE_ENV === 'development') {
            const fakedata = [
                {name: 'cclabadmin', email: 'cclab@gmail.com'},
                {name: 'yanglabadmin', email: 'yanglab@gmail.com'},
                {name: 'oklabadmin', email: 'oklab@gmail.com'},
                {name: 'hellolabadmin', email: 'cclab@gmail.com'},
                {name: 'foodlabadmin', email: 'yanglab@gmail.com'},
                {name: 'skylabadmin', email: 'oklab@gmail.com'},
                {name: 'cloudlabadmin', email: 'cclab@gmail.com'},
                {name: 'sunlabadmin', email: 'yanglab@gmail.com'},
                {name: 'moonlabadmin', email: 'oklab@gmail.com'},
            ]
            setLabadminlist(fakedata)
        } else {*/
            const getusernamelabadmin = async () => {
                try {
                    fetch('http://localhost:8000/manageadmin/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        setLabadminlist(data)
                    })
                } catch (err) {
                    // some fail from server
                }
            }
            getusernamelabadmin()
        //}
    }, [reload])

   
    return (
        <div className="manager">
            <div className="mainarea">
                <div className="managearea">
                    {/* <h5 className="usertype">Admin {auth.username}</h5> */}
                    <div className="inputarea">
                        <div className="left">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h5>新增實驗室管理者</h5>
                                <div className="inputfield">
                                    <label className="form-label" htmlFor="usernamelabadmin">Name and LDAP Name</label>
                                    <input
                                        className="form-control"
                                        type="text" id="usernamelabadmin"
                                        {...register('usernamelabadmin')}
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
                            <h4>實驗室管理者列表</h4>
                            <div className="lab-lists">
                                <div className="lab-list__column-name">
                                    <div className="no">No</div>
                                    <div className="labname">實驗室管理者名稱</div>
                                    <div className="del">刪除</div>
                                    <div className="changepassword">密碼設定</div>
                                </div>
                                {!labadminlist
                                    ? <></>
                                    : 
                                    labadminlist.map((item, index) => {
                                        return (
                                            <div className="lab-list" key={index}>
                                                <div className="lab-list__number">{index + 1}</div>
                                                <div className="lab-list__labname">{item.name}</div>
                                                <div className="lab-list__del">
                                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                                        const removelabadminuser = async () => {
                                                            const response = await axios({
                                                                method: 'DELETE',
                                                                url: 'http://localhost:8000/labadmindelete/',
                                                                data: {
                                                                    name: item.name, email: item.email
                                                                },
                                                            })
                                                            setReload(p => !p)
                                                        }
                                                        removelabadminuser()
                                                        // setLabadminlist(p => p.filter(i => i.name !== item.name))
                                                    }}>刪除</button>
                                                </div>
                                                <div className="lab-list__password">
                                                    <div className="lab-list__password__button">
                                                        <button className="btn btn-secondary btn-sm" onClick={(e) => changepassword(e, item)}>改密碼</button>
                                                        <PasswordBox item={item} usernamelabadmin={usernamelabadmin} setUsernamelabadmin={setUsernamelabadmin} changepassword={changepassword}/>
                                                    </div>  
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerAdmin
