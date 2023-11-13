import './Login.css';

import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import useAuth from '../hook/useAuth'

function Login() {
    
    const [feedback, setFeedback] = React.useState(null)
    const { register, handleSubmit } = useForm({mode: 'onChange'})
    const onSubmit = async (data) => {
        setFeedback(null)
        try {
            fetch('http://127.0.0.1:8000/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username': data.username, 'password': data.password}),
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.access)
                localStorage.setItem('refresh', data.refresh)
                window.location.href = '/'
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }
            );
        } catch (error)  {
            setFeedback({wrong: '你的帳號或密碼不正確，請再試一次'})
        }
        
    }

    // ========================
    const onError = (error, e) => {
        setFeedback(error)
    }

    return (
        <div className="login">
            <div className="container-xl">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="rounded-3">
                    <div className="login-title">
                        <h1 className="fs-3">登入</h1>
                    </div>
                    <div className="field-input">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" {...register('username', {required: "請輸入使用者名稱",})} type="username" id="username" placeholder="username" />
                    </div>
                    <div className="field-input">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" {...register('password', {
                            required: '請輸入密碼'
                        })} type="password" id="password" placeholder="輸入您的密碼"/>
                    </div>
                    <div className="back">
                        <p className="input-feedback">{feedback?.password?.message}</p>
                    </div>
                    <button className="btn btn-primary login-button">登入</button>
                    <div className="back">
                        <p className="input-feedback">{feedback?.wrong}</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login