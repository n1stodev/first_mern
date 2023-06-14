import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const { pathname } = useLocation()
    if (pathname.includes("login")) {
        return <></>
    }
    if (pathname.includes("*")) {
        return <></>
    }
    return (
        <div className='navbar'>
            <h2>MERN</h2>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/blog'>Blog</NavLink>
            <NavLink to='/comments'>Comments</NavLink>
            <NavLink to='/posts'>Posts</NavLink>
        </div>
    )
}

export default Navbar