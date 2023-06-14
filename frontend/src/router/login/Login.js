import React, { useState } from 'react'
import './Login.css'
import axios from '../../api'
import { toast } from 'react-toastify'

function Login() {
    const initialState = {
        username: "",
        password: ""
    }
    const [user, setUser] = useState(initialState)
    const handleLogin = e => {
        e.preventDefault()
        axios.post('/user/sign-in', user)
            .then(res => {
                console.log(res)
                toast.success(res.data.msg)
            })
            .catch(err => {
                toast.error(err.response.data.msg)
            })
    }
    return (
        <div className='login'>
            <h2>Login</h2>
            <form action="" onSubmit={handleLogin}>
                <br />
                <input value={user.username} onChange={e => setUser(p => ({ ...p, username: e.target.value }))} type="text" placeholder='Username' required />
                <br /><br />
                <input value={user.password} onChange={e => setUser(p => ({ ...p, password: e.target.value }))} type="password" placeholder='Password' required />
                <br /><br />
                <button type='submit'>LOGIN</button>
            </form>
        </div>
    )
}

export default Login