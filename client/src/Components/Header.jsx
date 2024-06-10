import React from 'react'
import { Link } from 'react-router-dom';

import Dropdown from './Dropdown';


const Header = () => {

  return (
    <header className="flex flex-row items-center justify-between py-3 px-20 border-b-2 bg-gray-100">
        <Link to="/">
            <h1>LOGO</h1>
        </Link>
        <nav>
            <ul className='flex items-center gap-10 font-semibold text-slate-600'>
                <li>
                    <Link to="/add-property" className="hover:text-red-400">Add Property</Link>
                </li>
                <li>
                    <Link to="/about-us" className="hover:text-red-400">About US</Link>
                </li>
                <li>
                    <div className='flex gap-2 bg-slate-200 p-2 rounded-full shadow-md'>
                        <Dropdown/>
                    </div>
                </li>
            </ul>
        </nav>
    </header>
  )
}


export default Header