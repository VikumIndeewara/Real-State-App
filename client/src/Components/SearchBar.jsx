import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm,setSearchTerm]=useState('');
  const navigate=useNavigate();
  console.log(searchTerm)

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('test')
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
    console.log(searchTerm,urlParams,searchQuery)
  }
  return (
    <div className="mb-3 md:w-96 w-full px-5 sticky top-0">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch bg-gray-100 rounded-md">
        <input
          type="search"
          className="h-12 m-0 min-w-0 flex-auto px-3 transition duration-200 ease-in-out hover:shadow-lg focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:placeholder:text-slate-600 dark:focus:border-primary rounded-md"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          aria-describedby="button-addon1"
        />

        <button
        onClick={handleSubmit}
          className="flex items-center rounded-r bg-gray-100 px-5 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-400 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
        >
          <FaSearch color="black" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
