import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function PasswordBox({item, usernamelabadmin, setUsernamelabadmin}) {

    const [newpassword1, setNewpassword1] = useState('')
    const [newpassword2, setNewpassword2] = useState('')

    return (
        <div onClick={(e)=> {e.stopPropagation()}} className={`password-box ${item.name === usernamelabadmin ? 'show': ''}`}>
            <div className="password-box__password__title">
                <p>更改 labadmin {usernamelabadmin} 密碼</p>
            </div>

            <div className="password-box__password__field">
                <div className="password-box__inputfield">
                    <label htmlFor="">新密碼</label>
                    <input type="password" onChange={(e) => setNewpassword1(e.target.value)} value={newpassword1} className="form-control"/>
                </div>
                <div className="password-box__password__sep"></div>
                <div className="password-box__inputfield">
                    <label htmlFor="">密碼確認</label>
                    <input type="password" onChange={(e) => setNewpassword2(e.target.value)} value={newpassword2} className="form-control" />
                </div>
            </div>

            <div className="password-box__button__field">
                <button className="btn btn-light btn-sm cancel" onClick={() => {
                    setUsernamelabadmin((p) => p === item.usernamelabadmin ? false: item.usernamelabadmin)
                }}>取消</button>
                <button className="btn btn-primary btn-sm" onClick={() => {
                    const updatepassword = async () => {
                        const response = await axios({
                            method: 'PUT',
                            url: process.env.REACT_APP_LABADMINPASSWORDCHANGE,
                            data: {
                                usernamelabadmin: item.name, email: item.email, password: newpassword1,
                            }
                        })
                    }
                    if (newpassword1 === '' || newpassword1 === '') {
                    } else if (newpassword1 === newpassword2) {
                        updatepassword()
                        setUsernamelabadmin((p) => p === item.name ? false: item.usernamelabadmin)
                    } else {
                    }
                }}>確認</button>
            </div>
        </div>
    )
}

export default PasswordBox