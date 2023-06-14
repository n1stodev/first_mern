import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function Auth() {
    const user = false
    return user ? <Outlet /> : <Navigate path="*" replace to={"/login"} />
}

export default Auth