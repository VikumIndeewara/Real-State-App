import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";

const Listing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [ownerDetails,setOwnerDetails]=useState({});
  const [message,setMessage]=useState('');

  const onChange=(e)=>{
    e.preventDefault();
    setMessage(e.target.value);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5555/listing/${id}`)
      .then((res) => {
        setListing(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(()=>{
    axios
    .get(`http://localhost:5555/user/getUser/${listing.userRef}`)
    .then((res) => {
      setOwnerDetails(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[listing.userRef])
  return (
    <div className="">
      <h1 className="mx-auto mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
        {listing.propertyname}
      </h1>
      <div>
        <div className="md:grid md:grid-cols-2 flex-wrap gap-2 w-full px-5 my-10 mx-auto md:px-10 lg:px-20 lg:w-[1100px]">
          {listing.images && listing.images.length > 0 && (
            <>
              <div className="">
                <img
                  src={listing.images[0]}
                  alt={`Image 1 of ${listing.propertyname}`}
                  className="h-full w-full object-cover object-center rounded-md"
                />
              </div>
              <div className="hidden md:grid md:grid-cols-2 gap-2 items-center">
                {listing.images.slice(1).map((image, index) => (
                  <div key={index} className="">
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index + 2} of ${listing.propertyname}`}
                      className="lg:h-[220px] md:h-[150px] w-full object-cover object-center rounded-md"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="my-2 sm:my-0 text-xl font-medium">{listing.address}</div>
          <div className="flex items-center col-span-2 justify-between text-2xl my-2 font-semibold sm:my-0">
            <div>{listing.price && listing.price.toLocaleString('en-US')}$</div>
            <div className="flex items-center p-2">
              <IoCall />
              {listing.contactnumber}
            </div>
          </div>
          <hr className="col-span-2 w-full border-t-2 border-gray-300" />
          <div className="col-span-1">
            <p>{listing.description}</p>
          </div>
          <div className="col-span-1">
            <div className="">
              <div className="flex justify-center gap-2 rounded-md border-0 mx-20 my-2 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                <FaBed className="h-6 w-6 text-gray-900" />
                <span>Beds:{listing.beds}</span>
              </div>
              <div className="flex justify-center gap-2 rounded-md border-0 px-10 mx-20 my-2 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                <FaBath className="h-6 w-6 text-gray-900" />
                Baths:{listing.baths}
              </div>
              <div className="flex justify-center gap-2 rounded-md border-0 px-10 mx-20 my-2 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                <GiFamilyHouse className="h-6 w-6 text-gray-900" />
                Floors:{listing.floors}
              </div>
            </div>
          </div>
          <hr className="col-span-2 w-full mt-10 border-t-2 border-gray-300" />
          <div className="col-span-2">
              <div className="flex justify-center items-center gap-10">
                <div className="text-center">
                    <img src={ownerDetails.avatar} alt="owner picture" className="rounded-full object-cover w-[200px] h-[200px]" />
                    <span>{ownerDetails.username}</span>
                </div>
                <div className="flex flex-col">
                  <span>Contact {ownerDetails.username} for {listing.propertyname}</span>
                  <textarea type="text" id="message" value={message} onChange={onChange} placeholder="Send A Message!" rows={3} className="ring-2 ring-slate-500  p-2 my-2 rounded-md min-w-[250px]"></textarea>
                  <Link to={`mailto:${ownerDetails.email}?subject=Regarding ${listing.propertyname} $body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>Send Message</Link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
