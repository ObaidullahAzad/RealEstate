import { useState } from "react";
import { CgArrowDownO } from "react-icons/cg";

import { useNavigate } from "react-router-dom";
import AvatarCircles from "../components/Avartar";
import { RiInstagramFill } from "react-icons/ri";
import ReviewCard from "@/components/ReviewCard";
import { FaFacebook, FaReddit, FaTwitter } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
export default function Home() {
  const [searchTerm, setsearchTerm] = useState("");
  console.log(searchTerm);
  const navigate = useNavigate();
  const imageUrl =
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

    console.log(searchTerm);
  };
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];
  return (
    <div className="bg-blue-50  h-screen">
      <div className="sm:flex justify-around items-center  sm:h-full ">
        <div
          data-aos="fade-up"
          className="text-4xl sm:text-8xl flex flex-col font-semibold text-slate-900 font-sans ml-8"
        >
          <span className="mt-8 sm:mt-0">Find The Most</span>
          <span>Appropriate Residence</span>
          <span>
            For You To Live In
            <button className="bg-white ml-5 rounded-[50px]">
              <CgArrowDownO className="" />
            </button>
          </span>
        </div>
        <div
          data-aos="fade-up"
          className="bg-cyan-400 mt-8 m-[70px] bg-opacity-25 backdrop-blur-lg w-[250px] h-[300px] rounded-3xl sm:mr-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
        >
          <div className="bg-white flex gap-3 p-3 opacity-100 rounded-3xl m-1">
            <img
              className="w-[20px] h-[25px] rounded-full"
              src="https://i.pinimg.com/originals/49/d5/b2/49d5b215b12847a876d5e888a9c5b5c5.jpg"
            />
            <p className="font-semibold uppercase">Top Testimonials</p>
          </div>
          <div className=" p-3 overflow-hidden ">
            <p className="text-black font-semibold text-lg p-3 ">
              Incredible Experience With Garment! Their Expertise And
              Deddication Made Finding My Perfect Property
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-50  flex justify-center p-10 ">
        <form
          onSubmit={handleSubmit}
          className=" bg-white flex border rounded-3xl "
        >
          <input
            className="sm:w-[1000px] w-[250px] sm:h-[100px] text-center text-2xl rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          ></input>
          <button className="bg-slate-950 sm:text-2xl hover:scale-105  p-3 font-normal text-slate-100 rounded-3xl m-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            {/* <FaSearch className="text-slate-600" /> */}
            Search Property
          </button>
        </form>
      </div>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="sm:flex   sm:justify-start sm:items-end h-full ">
          <div className="flex flex-col ml-[70px] mb-10 text-7xl ">
            <h1 className="sm:text-8xl mt-5 font-semibold text-slate-100 font-sans  sm:ml-8">
              We are Here
            </h1>
            <h1 className="sm:text-8xl font-semibold text-slate-100 font-sans sm:ml-8">
              for You
            </h1>
            <AvatarCircles
              className="ml-8 mt-8"
              numPeople={99}
              avatarUrls={avatars}
            />
          </div>
          <div className="text-slate-100  bg-opacity-60 sm:w-[700px] h-[300px] rounded-3xl sm:ml-24 scale-75 sm:absolute right-0">
            <div className=" flex flex-row gap-9 ">
              <div className="flex flex-col items-center flex-auto">
                <h1 className="font-semibold text-7xl">150+ </h1>
                <h1 className="text-xl">Properties Available</h1>
              </div>
              <div className=" flex flex-col items-center flex-auto">
                <h1 className="font-semibold text-7xl">83</h1>
                <h1 className="text-xl">Total Partners</h1>
              </div>
            </div>
            <div className=" flex flex-row flex-wrap items-center justify-center sm:gap-9 text-slate-100 text-xl mt-10 ">
              <div className="bg-slate-500 bg-opacity-50 flex justify-center rounded-3xl m-5  pl-4 pr-4 scale-150 shadow-2xl hover:bg-slate-400 cursor-pointer  ">
                Furniture
              </div>
              <div className="bg-slate-500 bg-opacity-50 flex justify-center rounded-3xl m-5 pl-4 pr-4 scale-150 shadow-2xl hover:bg-slate-400 cursor-pointer">
                Home
              </div>
              <div className="bg-slate-500 bg-opacity-50 flex justify-center rounded-3xl m-5 pl-4 pr-4 scale-150 shadow-2xl hover:bg-slate-400 cursor-pointer">
                Rent
              </div>
              <div className="bg-slate-500 bg-opacity-50 flex justify-center rounded-3xl m-5  pl-4 pr-4 scale-150 shadow-2xl hover:bg-slate-400 cursor-pointer">
                100%
              </div>
              <div className="bg-slate-500 bg-opacity-50 flex justify-center rounded-3xl m-5 pl-4 pr-4 scale-150 shadow-2xl hover:bg-slate-400 cursor-pointer">
                Brand
              </div>
              <div className="bg-slate-500 bg-opacity-50 flex justify-center rounded-3xl m-5 pl-4 pr-4 scale-150 shadow-2xl hover:bg-slate-400 cursor-pointer">
                Trusted
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 pb-20  flex justify-center items-center h-96 text-4xl sm:text-8xl text-center">
        <h1>
          See Other People Who Have<h1> Lived in Our Residence</h1>
        </h1>
      </div>
      <div className="bg-blue-50 sm:flex justify-center gap-10 pb-20">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
      <div className="bg-slate-900 text-white sm:flex sm:h-[300px] h-screen">
        <div className="p-10 ">
          <h2 className="text-3xl pb-3">Contact Us</h2>
          <p>Phone: 123-456-7890</p>
          <p>Email:Estate@example.com</p>
          <p className="sm:w-[400px]">
            Address:Nyaya Marg, Block C, Diplometic Enclave,
            Chanakyapuri,Delhi,India 110021
          </p>
        </div>
        <div className=" sm:absolute right-0 p-10">
          <h2 className=" text-3xl pb-3">Social Link</h2>
          <a href="https://example.com" target="_blank">
            <p className="flex flex-row text-xl items-center gap-2 hover:scale-110 cursor-pointer">
              <RiInstagramFill />
              Instagram
            </p>
          </a>
          <a href="https://example.com" target="_blank">
            <p className="flex flex-row text-xl items-center gap-2 hover:scale-110 cursor-pointer">
              <FaFacebook />
              Facebook
            </p>
          </a>
          <a href="https://example.com" target="_blank">
            <p className="flex flex-row text-xl items-center gap-2 hover:scale-110 cursor-pointer">
              <FaTwitter />
              Twitter
            </p>
          </a>
          <a href="https://example.com" target="_blank">
            <p className="flex flex-row text-xl items-center gap-2 hover:scale-110 cursor-pointer">
              <FaReddit />
              Reddit
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
