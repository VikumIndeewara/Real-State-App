import axios from 'axios';
import React, { useState,useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firebase.js";
import { IoMdCloseCircle } from "react-icons/io";
import PropTypes from 'prop-types'; 

const ListingEditPopup = ({listing}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateListing,setUpdateListing]=useState(listing);
  const [images,setImages]=useState([]);
  const [loading,setLoading]=useState(false);
  const [uploadPerc,setUploadPerc]=useState('');
  const fileRef = useRef(null);

  const handleChange = (e)=>{
    setUpdateListing({
      ...updateListing,
      [e.target.id]:e.target.value,
    });
    console.log(updateListing);
  }

  const handleSubmit=()=>{
    const id = listing._id;
    const link= `https://real-state-app-server.onrender.com/listing/update-listing/${id}`
    axios
    .put(link,updateListing)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })

    }

    const handleUpdateImages = async () => {
      const imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        imagesLinks.push(uploadImages(images[i]));
      }
  
      try {
        const results = await Promise.all(imagesLinks);
        setUpdateListing((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...results],
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error uploading images: ", error);
      }
    }
  
    const uploadImages = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPerc(Math.round(progress));
            console.log(uploadPerc);
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
          }
        );
      });
    }
    const selectImages=()=>{
      fileRef.current.click();
      if(images){
        handleUpdateImages();
      }
      
    }
    const handleRemoveImage = (index, e) => {
      e.preventDefault();
      setUpdateListing((prevData) => ({
        ...prevData,
        images: prevData.images.filter((_, i) => i !== index)
      }));
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
                    value={updateListing.propertyname}
                    onChange={handleChange}
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
                    value={updateListing.address}
                    onChange={handleChange}
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
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999"
                    value={updateListing.price}
                    onChange={handleChange}
                    min={1}
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
                    value={updateListing.beds}
                    onChange={handleChange}
                    min={1}
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
                    value={updateListing.baths}
                    onChange={handleChange}
                    min={1}
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
                    value={updateListing.floors}
                    onChange={handleChange}
                    min={1}
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
                    value={updateListing.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {loading ? (<span>Loading.....!</span>):
                <div>
                <span onClick={selectImages} className="cursor-pointer hover:text-blue-500">Upload a file</span>
                <input
                            id="images"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            multiple
                            ref={fileRef}
                            onChange={(e) => {
                              setImages(e.target.files);
                            }}
                          />
                          </div>}
              </div>
              <div className="flex gap-4">
                  {updateListing.images && updateListing.images.map((url, index) => (
                    <div key={index} className="relative ">
                      <button onClick={(e) => handleRemoveImage(index, e)} className="absolute top-2 right-2 text-red-600">
                        <IoMdCloseCircle size={24} />
                      </button>
                      <img key={index} src={url} alt={`Uploaded image ${index}`} className="h-[50px] w-[50px] object-cover rounded-lg"/>
                    </div>
                  ))}
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

ListingEditPopup.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    propertyname: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    beds: PropTypes.number.isRequired,
    baths: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
};


export default ListingEditPopup;
