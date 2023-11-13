import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

function Signup() {
    const {register, handleSubmit, setError, formState: { errors }} = useForm()
    const navigate = useNavigate()
    const { setAuth } = useAuth()

    const onSubmit = async (data) => {

        try {
            const response = await axios({
                method: 'post',
                url: process.env.REACT_APP_SIGNUP,
                data: {
                    ...data
                },
                withCredentials: true,
             })
            setAuth({...response.data})
            navigate('/system', {replace: true})
        } catch (error) {
            setError('email', {
                type: 'custom',
                message: '已有此帳號'
            })
        }
    }

    const onError = (error) => {
    }

    return (
        <div className="signup">
            <div className="wrap">
                <div className="container-xl">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <h3>Axtasy</h3>
                            <h4>建立新帳戶</h4>
                        </div>
                        <div className="col-12 col-sm-6">
                            <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
                                <div className="signup-feild">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control"
                                        {...register('email', {
                                            required: '請輸入電子信箱',
                                            pattern: {
                                                value: /[a-zA-z0-9]@[a-z]+.com/,
                                                message: '格式不符合',
                                        },
                                        
                                    })} placeholder="email"/>
                                </div>
                                
                                <div className="feedback-area">
                                    <p className="feedback-text">{errors?.email?.message}</p>
                                </div>

                                <div className="signup-feild">
                                    <label htmlFor="username">username</label>
                                    <input type="text" className="form-control"
                                        {...register('username', {
                                            required: '使用者名稱',
                                    })} placeholder="username"/>
                                </div>

                                <div className="feedback-area">
                                    <p className="feedback-text">{errors?.username?.message}</p>
                                </div>

                                <div className="signup-feild">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" {...register('password', {
                                        required: '請輸入密碼'
                                    })} placeholder="password"/>
                                </div>
                                <div className="feedback-area">
                                    <p className="feedback-text">{errors?.password?.message}</p>
                                </div>
                                <button className="signup-button">註冊</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup