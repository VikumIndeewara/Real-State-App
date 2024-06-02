import React,{useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import { MdAccountCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import useClickOutside from './clickOutside.jsx';

const Dropdown = () => {
  const [showMenu,setShowMenu]=useState(false);
  const dropdownContainerRef = useRef(null);
  useClickOutside(dropdownContainerRef, () => {
    setShowMenu(false);
  });
  return (
    <>
    <Link to="/profile" className="hover:text-red-400"><MdAccountCircle size={28}/></Link>
    <button onClick={()=>{setShowMenu(!showMenu)}} className="hover:text-red-400"><GiHamburgerMenu size={28}/></button>
    {showMenu ? (
    <div className="absolute right-0 z-10 mt-10 mr-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="flex flex-col py-1" role="none" ref={dropdownContainerRef}>
            <Link to={'/sign-in'} className='p-2 hover:text-red-400'>Sign In</Link>
            <Link to={'/sign-up'} className='p-2 hover:text-red-400'>Sign Up</Link>
        </div>
    </div>
          ):''
    }
    </>
  )
}

export default Dropdown;