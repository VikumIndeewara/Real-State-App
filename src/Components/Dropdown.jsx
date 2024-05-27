import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = () => {
  return (
    <div className="absolute right-0 z-10 mt-10 mr-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="flex flex-col py-1" role="none">
            <Link to={'/sign-in'} className='p-2'>Sign In</Link>
            <Link to={'/sign-up'} className='p-2'>Sign Up</Link>
        </div>
    </div>
  )
}

export default Dropdown