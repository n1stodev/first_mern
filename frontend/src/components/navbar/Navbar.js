import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className='navbar'>
            <h2>MERN</h2>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/blog'>Blog</NavLink>
            <NavLink to='/comments'>Comments</NavLink>
        </div>
    )
}

export default Navbar