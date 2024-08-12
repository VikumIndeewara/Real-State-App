import React, { useEffect, useState, useRef } from "react";
import backgroundImage from "../assets/images/back3.jpg";
import SearchBar from "../Components/SearchBar";
import ListingCard from "../Components/ListingCard";
import axios from "axios";
import { register } from "swiper/element/bundle";
register();

import illustration1 from "../assets/images/illustration1.jpg";
import illustration2 from "../assets/images/illustration2.jpg";
import illustration3 from "../assets/images/illustration3.svg";
import FAQSection from "../Components/FAQSection";


const Home = () => {
  const backgroundImageUrl = `url(${backgroundImage})`;
  const [listings, setListings] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/server_api/listing/search-listings`)
      .then((res) => {
        setListings(res.data.listings || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperEl = swiperRef.current;

      const swiperParams = {
        slidesPerView: 4,
        breakpoints: {
          300: {
            slidesPerView: 2,
            width: 650,
          },
          480: {
            slidesPerView: 2,
            width: 650,
          },
          600: {
            slidesPerView: 2,
            width: 650,
          },
          1024: {
            slidesPerView: 3,
            width: 980,
          },
        },
        navigation: true,
        on: {
          init() {
          },
        },
      };

      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
    }
  }, [listings]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.3)), ${backgroundImageUrl}`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="mx-auto max-w-2xl py-32 sm:py-46 lg:py-36 relative animate-fade-out-down supports-no-scroll-driven-animations:animate-none [animation-range:0px_300px] [animation-timeline:scroll()]"
          style={{ backgroundSize: "cover" }}
        >
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Find about exclusive discounts.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
              Houses and Apartments for Rent
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 md:mx-20 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in-left supports-no-view-driven-animations:animate-none [animation-range:0px_400px] [animation-timeline:view()] ">
          {listings.length > 0 &&(
          <div className="flex flex-col ">
            <div className="mb-5">
              <span className="font-bold text-2xl ">Featured Listings</span>
              <p className="text-slate-600 mt-1">
                Discover Most suitable houses and apartments for rent.
              </p>
            </div>
            <div>
              {listings && listings.length > 0 && (
                <swiper-container ref={swiperRef} init="false">
                  {listings.map((listing, index) => (
                    <swiper-slide key={index}>
                      <ListingCard listing={listing} />
                    </swiper-slide>
                  ))}
                </swiper-container>
              )}
            </div>
          </div>
          )}
        </div>
        <div className="flex justify-center my-24">
          <div className="text-center max-w-xl animate-fade-in-up supports-no-view-driven-animations:animate-none [animation-range:0px_500px] [animation-timeline:view()]">
            <span className="font-bold text-2xl">Why Choose Us?</span>
            <p className="text-slate-600 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ea
              pariatur accusamus nulla obcaecati impedit. At exercitationem est
              ratione libero soluta, magni saepe unde iure distinctio. Autem,
              cumque illum! Est.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 text-center my-5">
            <div className="flex flex-col items-center animate-fade-in-left supports-no-view-driven-animations:animate-none [animation-range:0px_400px] [animation-timeline:view()]">
              <img
                src={illustration1}
                className="w-[300px] h-[150px] lg:w-[500px] lg:h-[300px]  object-cover mb-5 "
              />
              <span className="font-semibold">Easy to choose a place</span>
              <p className="text-slate-600 mt-1">
                Find your next roof hassle free.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={illustration2}
                className="w-[300px] h-[150px] lg:w-[500px] lg:h-[300px]  object-cover mb-5"
              />
              <span className="font-semibold">Seamless communication</span>
              <p className="text-slate-600 mt-1">
                Manage Seamless communication with customers
              </p>
            </div>
            <div className="flex flex-col items-center animate-fade-in-right supports-no-view-driven-animations:animate-none [animation-range:0px_400px] [animation-timeline:view()]">
              <img
                src={illustration3}
                className="w-[300px] h-[150px] lg:w-[500px] lg:h-[300px] object-cover mb-5"
              />
              <span className="font-semibold">Easy to list</span>
              <p className="text-slate-600 mt-1">
                List your property without any hassle.
              </p>
            </div>
          </div>
        </div>
        <div className="animate-make-it-bigger supports-no-view-driven-animations:animate-none [animation-range:0px_500px] [animation-timeline:view()] transition">
        <FAQSection />
        </div>
        
      </div>

    </div>
  );
};

export default Home;
