import React from "react";
import backgroundImage from "../assets/images/back3.jpg";
import SearchBar from "../Components/SearchBar";

const Home = () => {
  const backgroundImageUrl = `url(${backgroundImage})`;
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.3)), ${backgroundImageUrl}`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="mx-auto max-w-2xl py-32 sm:py-46 lg:py-36 relative"
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
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
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
    </div>
  );
};

export default Home;
