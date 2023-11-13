import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function PasswordBox({item, usernamelab, setusernamelab}) {

    const [newpassword1, setNewpassword1] = useState('')
    const [newpassword2, setNewpassword2] = useState('')
    return (
        <div onClick={(e)=> {e.stopPropagation()}} className={`password-box ${item.name === usernamelab ? 'show': ''}`}>
            <div className="password-box__password__title">
                <p>更改 LabUser {item.name}密碼</p>
            </div>

            <div className="password-box__password__field">
                <div className="password-box__inputfield">
                    <label htmlFor="">新密碼</label>
                    <input onChange={(e) => setNewpassword1(e.target.value)} value={newpassword1} className="form-control" type="password" />
                </div>
                <div className="password-box__password__sep"></div>
                <div className="password-box__inputfield">
                    <label htmlFor="">密碼確認</label>
                    <input onChange={(e) => setNewpassword2(e.target.value)} value={newpassword2} className="form-control" type="password" />
                </div>
            </div>

            <div className="password-box__button__field">
                <button className="btn btn-light btn-sm cancel" onClick={() => {
                    setusernamelab((p) => p === item.name ? false: item.usernamelabadmin)
                }}>取消</button>
                <button className="btn btn-primary btn-sm" onClick={() => {
                    const updatepassword = async () => {
                        const response = await axios({
                            method: 'PUT',
                            url: process.env.REACT_APP_USERCHANGEPASSWORD,
                            data: {
                                usernamelabuser: item.name, email: item.email, password: newpassword1,
                            }
                        })
                    }
                    if (newpassword1 === '' || newpassword1 === '') {
                    } else if (newpassword1 === newpassword2) {
                        updatepassword()
                        setusernamelab((p) => p === item.name ? false: item.name)
                    } else {
                    }
                }}>確認</button>
            </div>
        </div>
    )
}

export default PasswordBox