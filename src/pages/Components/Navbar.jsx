import React from 'react'
import { navItems } from '../../Utils/utils'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () =>{
        localStorage.clear();
        navigate('/')
    }

    //user details
    const admin = JSON.parse(localStorage.getItem("adminCredentials"))
    const student = JSON.parse(localStorage.getItem("studentCredentials"))

    const loggedInUser = admin || student

  return (
    <div className='w-full w-hit border-b'>
        <div className='max-w-screen-xl mx-auto py-4 flex items-center justify-between' >
        <h1 className='text-4xl font-semibold' >Brand</h1>
        <ul className='flex items-center gap-4' >
            {navItems?.map((Element , id) =>(
                <li key={id} className='text-sm cursor-pointer' >{Element.item}</li>
            ))}
        </ul>
        <div className='flex items-end gap-5'>
            <div className='flex items-center gap-2' >
                <p className='text-2xl' ><FaUserCircle/></p>
                <div>
            <p className='text-sm' >{loggedInUser?.mail}</p>
            <p className='text-sm opacity-75' >{loggedInUser?.role}</p>
                </div>
            </div>
        <button onClick={logout} className='bg-black text-white px-6 py-2 rounded-md' >Log out</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
