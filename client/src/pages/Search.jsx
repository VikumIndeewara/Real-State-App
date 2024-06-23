import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar.jsx";
import axios from "axios";
import ListingCard from "../Components/ListingCard.jsx";
import { useLocation } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Search = () => {
  const [searchFilter, setSearchFilter] = useState({});
  const [listings, setListings] = useState([]);
  const [pages, setPages] = useState({});
  const [pageNumbers,setPageNumbers]=useState([]);
  const [totalListings, setTotalListings] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const location = useLocation();

  useEffect(
    () => {
      const urlParams = new URLSearchParams(location.search);

      if (searchFilter.sort && searchFilter.order) {
        urlParams.set("sort", searchFilter.sort);
        urlParams.set("order", searchFilter.order);
      }

      if (startIndex) {
        urlParams.set("startIndex", startIndex);
      }

      const getListing = () => {
        const searchQuery = urlParams.toString();
        console.log("Q", searchQuery);
        console.log("SI", startIndex);
        axios
          .get(`http://localhost:5555/listing/search-listings?${searchQuery}`)
          .then((res) => {
            setListings(res.data.listings);
            setPages(res.data.totalPages);
            setTotalListings(res.data.totalListings);
            // console.log("pages", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getListing();
    },
    [location.search, searchFilter, startIndex]
  );

  const handleChange = (e) => {
    const sort = e.target.value.split("_")[0];
    const order = e.target.value.split("_")[1];

    setSearchFilter({ sort: sort, order: order });
  };

  const handlePageChange = async (e) => {
    setPageNumber(Number(e.target.id));
    console.log("pn", pageNumber);
  };
  useEffect(() => {
    setStartIndex(pageNumber * 9);
    console.log("pn2", pageNumber);
  }, [pageNumber]);

  const prevPage = () => {
    if (pageNumber != 0) {
      setPageNumber(pageNumber - 1);
    }
  };
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div>
      <div className="flex justify-center items-center pt-5 w-full bg-slate-200 ">
        <SearchBar />
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
        <span>Found {totalListings} listings</span>
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
      {pages && (
            <div className="flex justify-center gap-4 m-10">
              <button onClick={prevPage} disabled={pageNumber === 0}>
                <MdKeyboardArrowLeft />
              </button>
              {[...Array(pages)].map((_, index) => (
                <button
                  onClick={handlePageChange}
                  id={index.toString()}
                  key={index}
                  aria-current={pageNumber === index ? "page" : undefined}
                  className={`ring-1 active ring-black px-2 py-1 rounded-md ${
                    pageNumber === index ? "bg-gray-300" : ""
                  }`}
                >
                  {index+1}
                </button>
              ))}
              <button onClick={nextPage}  disabled={pageNumber === pages - 1}>
                <MdOutlineKeyboardArrowRight />
              </button>
            </div>
          )}
      {/* <div className="flex justify-center gap-2 m-10">
            <button
            onClick={prevPage}>
              <MdKeyboardArrowLeft/>
            </button>
          <button
                onClick={handlePageChange}
                id="0"
                 key={1} 
                 aria-current={pageNumber === index ? "page" : undefined}
                  className={`ring-1 active ring-black px-2 py-1 rounded-md ${pageNumber === index ? "bg-gray-300" : ""}`}>
                    1
            </button>
            <button
            onClick={handlePageChange}
            id="1"
                 key={2} 
                  className="ring-1 ring-black px-2 py-1 rounded-md">
                    2
            </button>
            <button
            onClick={handlePageChange}
            id="2"
                 key={3}
                  className="ring-1 ring-black px-2 py-1 rounded-md">
                    3
            </button>
            <button
            onClick={handlePageChange}
            id="3"
                 key={4} 
                  className="ring-1 ring-black px-2 py-1 rounded-md">
                    4
            </button>
            <button
            onClick={handlePageChange}
            id="4"
                 key={5} 
                  className="ring-1 ring-black px-2 py-1 rounded-md">
                    5
            </button>
            <button
            onClick={nextPage}>
              <MdOutlineKeyboardArrowRight/>
            </button>
          </div> */}
    </div>
  );
};

export default Search;
