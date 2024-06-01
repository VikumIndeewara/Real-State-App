import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import Dropdown from './Dropdown';
import onClickOutside from 'react-click-outside';

const Header = () => {
    const [showMenu,setShowMenu]=useState(false);
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
                        <Link to="/profile" className="hover:text-red-400"><MdAccountCircle size={28}/></Link>
                        <button onClick={()=>{setShowMenu(!showMenu)}} className="hover:text-red-400"><GiHamburgerMenu size={28}/></button>
                        {showMenu ? (<Dropdown/>):('')} 
                    </div>
                </li>
            </ul>
        </nav>
    </header>
  )
}


export default Header