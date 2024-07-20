import React from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ListingCard = ({ listing }) => {
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();
  return (
    <div className="grid grid-rows-2 bg-white border border-gray-200 rounded-lg shadow w-[320px]" >
        <Swiper
      className="w-[320px]"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {listing.images.map((image)=>(
        <SwiperSlide key={image}>
              <img 
              className="rounded-t-lg object-cover h-[210px] w-[320px] hover:scale-105 transition-scale duration-300 "
              src={image}
              alt="property cover image"
            />
            </SwiperSlide>
      ))}
    </Swiper>

    <div className="px-5 py-3 grid grid-rows-5 " style={{ gridTemplateRows: '48px 28px 28px 28px 28px' }}>
        <h5 className="font-bold tracking-tight text-gray-900 overflow-hidden overflow-ellipsis" onClick={()=>navigate(`/listing/${listing._id}`)}>
          {listing.propertyname}
        </h5>
      <p className="font-normal text-gray-700 overflow-hidden overflow-ellipsis">{listing.address}</p>
      <div className="flex gap-2">
        <p className="font-normal text-gray-700 ">Beds: {listing.beds}</p>
        <p className="font-normal text-gray-700 ">Baths: {listing.baths}</p>
      </div>
      <p className="font-normal  text-gray-700 overflow-hidden overflow-ellipsis">{listing.price}$</p>
      <button className="pt-5 inline-flex items-center text-sm font-medium text-center " onClick={()=>navigate(`/listing/${listing._id}`)} >
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

ListingCard.propTypes = {
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

export default ListingCard;
