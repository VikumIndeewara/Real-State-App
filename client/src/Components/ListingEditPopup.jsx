import axios from 'axios';
import React, { useState } from 'react';

const ListingEditPopup = ({listingId}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit=()=>{
    // const id = listingId;
    // const link= 'http://localhost:5555/listing/update-listing'
    // axios
    // .put()
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-0 ring-2 ring-green-400 rounded-md py-1 hover:ring-1 hover:shadow-lg font-medium bg-green-50 text-center w-full"
      >
        EDIT
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative p-4 w-full max-w-md bg-white rounded-lg shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Listing
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>


            <form className="p-4">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="propertyname"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Property Name
                  </label>
                  <input
                    type="text"
                    id="propertyname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999"
                    min={1}
                    required
                  />
                </div>
                <div className="flex gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="beds"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Beds
                  </label>
                  <input
                    type="number"
                    id="beds"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="1"
                    min={1}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="baths"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Baths
                  </label>
                  <input
                    type="number"
                    id="baths"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="1"
                    min={1}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="floors"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Floors
                  </label>
                  <input
                    type="number"
                    id="floors"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="1"
                    min={1}
                    required
                  />
                </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                   Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
              </div>
              <button
              onClick={handleSubmit}
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingEditPopup;
