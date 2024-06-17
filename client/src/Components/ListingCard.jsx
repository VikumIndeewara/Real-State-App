import React from "react";
import cardImage from "../assets/images/back2.jpg";

const ListingCard = ({ listing }) => {
  return (
    <div className="grid grid-rows-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
    <a href="#">
      <img
        className="rounded-t-lg object-cover h-[210px] w-[400px]"
        src={listing.images[0]}
        alt="property cover image"
      />
    </a>

    <div className="px-5 py-3 grid grid-rows-5 " style={{ gridTemplateRows: '48px 28px 28px 28px 28px' }}>
        <h5 className="font-bold tracking-tight text-gray-900 overflow-hidden overflow-ellipsis">
          {listing.propertyname}
        </h5>
      <p className="font-normal text-gray-700 overflow-hidden overflow-ellipsis">{listing.address}</p>
      <div className="flex gap-2">
        <p className="font-normal text-gray-700 ">Beds: {listing.beds}</p>
        <p className="font-normal text-gray-700 ">Baths: {listing.baths}</p>
      </div>
      <p className="font-normal  text-gray-700 overflow-hidden overflow-ellipsis">{listing.price}$</p>
      <button className="pt-5 inline-flex items-center text-sm font-medium text-center ">
        Show more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
    <div>
    </div>
  </div>
  
  );
};

export default ListingCard;
