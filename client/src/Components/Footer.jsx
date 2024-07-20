import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-5 border-b border-slate-600 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <hr className="border-slate-200 my-5"/>
        <div className="flex justify-around">
          <Link  to="/">
          <img src="../logo.svg" alt="" className='h-[32px]'/>
          </Link>
          <div className="flex flex-col gap-4">
            <span className="font-semibold">Legal</span>
            <a href="#" className="text-slate-600">Privacy policy</a>
            <a href="#" className="text-slate-600">Terms & Consitions</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold">Details</span>
            <a href="#" className="text-slate-600">About Us</a>
            <a href="#" className="text-slate-600">Contact Us</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold">Socials</span>
            <a href="#" className="text-slate-600">
              <FaFacebook />
            </a>
            <a href="#" className="text-slate-600">
              <AiFillTwitterCircle />
            </a>
            <a href="#" className="text-slate-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <hr className="border-slate-200 my-5"/>
        <div className="flex justify-center">
          <span className="text-sm text-slate-500">© 2023 LOGO™. All Rights Reserved.</span>
        </div>
      </div>

    </div>
  );
};

export default Footer;
