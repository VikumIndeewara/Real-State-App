import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar.jsx";
import axios from "axios";
import ListingCard from "../Components/ListingCard.jsx";
import { useLocation } from "react-router-dom";

const Search = () => {
    const [searchFilter,setSearchFilter]=useState({});
    const [listings,setListings]=useState([]);
    const location = useLocation();

    useEffect(()=>{

        console.log('test search page')
        const urlParams = new URLSearchParams(location.search)
        const sort = urlParams.get('sort')
        const order = urlParams.get('order')
        console.log('params',urlParams)

        if(sort||order){
            setSearchFilter({
                sort:sort||'createdAt',
                order:order||'desc',
            })
        }

        const getListing=()=>{
            const searchQuery = urlParams.toString();
            console.log('Q',searchQuery)
            axios
            .get(`http://localhost:5555/listing/search-listings?${searchQuery}`)
            .then((res)=>{
                setListings(res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        getListing();

    },[location.search])

    const handleChange=(e)=>{
      const sort = e.target.value.split('_')[0] || 'createdAt';
      const order = e.target.value.split('_')[1] || 'desc';

      setSearchFilter({
        sort:sort,
        order:order
      })
    }

  return (
    <div>
      <div className="flex justify-center items-center pt-5 w-full bg-slate-200 ">
        <SearchBar/>
      </div>
      <form>
        <div className="pt-5 px-5">
          <label>Sort:</label>
          <select
            onChange={handleChange}
            defaultValue={"createdAt_desc"}
            id="sort_order"
            className="border rounded-lg p-3 mx-2 mb-5"
          >
            <option value="price_asc">Price low to high</option>
            <option value="price_desc">Price high to low</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>
      </form>
      <hr />
      <div className="px-5 mt-5">
        <span className="font-semibold">Search Results:</span>
        <div>
        <div className="flex flex-row flex-wrap justify-center gap-2">
              {listings &&
                listings.map((listing, index) => (
                  <div key={index} className="p-1 m-2">
                    <ListingCard listing={listing} />
                  </div>
                ))}
                </div>
        </div>
      </div>
      
    </div>
  );
};

export default Search;
