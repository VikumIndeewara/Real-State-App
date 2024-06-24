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
    setStartIndex(pageNumber*9);
    console.log("pn2", pageNumber);
  }, [pageNumber]);

  const prevPage = () => {
    if (pageNumber != 0) {
      setPageNumber(pageNumber - 1);
    }
  };
  const nextPage = () => {
    if (pageNumber < pages - 1) {
    setPageNumber(pageNumber + 1);
    }
  };
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(0, pageNumber - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow;

    if (endPage > pages) {
      endPage = pages;
      startPage = Math.max(0, endPage - maxPagesToShow);
    }

    const pageNumbers = [];
    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
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
      {pages > 1 && (
        <div className="flex justify-center gap-4 m-10">
          <button onClick={prevPage} disabled={pageNumber === 0}>
            <MdKeyboardArrowLeft />
          </button>
          {pageNumber > Math.floor(getPageNumbers().length / 2) && getPageNumbers()[0] !== 0 &&(
            <>
              <button onClick={handlePageChange} id="0" className="ring-1 ring-black px-2 py-1 rounded-md">
                1
              </button>
              <span>...</span>
            </>
          )}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={handlePageChange}
              id={page.toString()}
              aria-current={pageNumber === page ? "page" : undefined}
              className={`ring-1 ring-black px-2 py-1 rounded-md ${
                pageNumber === page ? "bg-gray-300" : ""
              } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {page + 1}
            </button>
          ))}
          {pageNumber < pages - Math.ceil(getPageNumbers().length / 2) && getPageNumbers().slice(-1)[0] !== pages - 1 && (
            <>
              <span>...</span>
              <button onClick={handlePageChange} id={(pages - 1).toString()} className="ring-1 ring-black px-2 py-1 rounded-md">
                {pages}
              </button>
            </>
          )}
          <button onClick={nextPage} disabled={pageNumber === pages - 1}>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}

    </div>
  );
};

export default Search;
