import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaShare } from "react-icons/fa";
import Contact from "../components/Contact";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { TbParkingCircle } from "react-icons/tb";
import { RiSofaLine } from "react-icons/ri";

interface Listing {
  name: string;
  offer: boolean;
  discountPrice: number;
  regularPrice: number;
  type: string;
  address: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  imageUrls: string[];
  userRef: string;
}

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const params = useParams();
  const { currentUser } = useSelector((state: any) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/listing/get/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading.......</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="flex flex-col">
          <div className="sm:flex">
            <div className="bg-green-200 sm:w-[900px] m-3 sm:m-10  rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <Swiper
                navigation={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 rounded-3xl"
              >
                {listing.imageUrls.map((url: any) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[500px]"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {copied && (
                <p className="top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                  Link Copied!
                </p>
              )}
              <div className=" top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                <FaShare
                  className="text-slate-500"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                />
              </div>
            </div>

            <div className="flex bg-slate-200 flex-col mx-auto max-h-[550px] p-5 my-9 gap-4 rounded-3xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
              <p className="text-3xl  font-semibold p-4">{listing.name} -</p>
              <p className="flex text-lg items-center gap-2 bg-slate-300 p-5 rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                {listing.address}
              </p>
              <p className="text-2xl font-semibold bg-blue-50 p-5 rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                ${" "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US") || "N/A"
                  : listing.regularPrice.toLocaleString("en-US") || "N/A"}
                {listing.type === "rent" && (
                  <span className="text-lg text-slate-700"> /month</span>
                )}
              </p>
              <div className="flex gap-4">
                <p className="bg-slate-800 w-full max-w-[200px] font-semibold text-white text-center p-3 m-4 rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ${listing.regularPrice - listing.discountPrice} off
                  </p>
                )}
              </div>
              <ul className=" font-semibold text-xs sm:text-sm items-center gap-4 sm:gap-6 flex flex-wrap">
                <li className="flex items-center gap-1 bg-blue-200 p-3 sm:p-4 flex-col whitespace-nowrap rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
                  <IoBedOutline className="text-3xl" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap p-3 bg-blue-200 sm:p-4 flex-col rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                  <PiBathtub className="text-3xl" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap p-3 bg-blue-200 sm:p-4 flex-col rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                  <TbParkingCircle className="text-3xl" />
                  {listing.parking ? "Parking Spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap p-3 bg-blue-200 sm:p-4 flex-col rounded-2xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                  <RiSofaLine className="text-3xl" />
                  {listing.furnished ? "Furnished" : "Not Furnished"}
                </li>
              </ul>
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    Contact Landlord
                  </button>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
          <div className="bg-blue-50 p-8 m-8 rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <p className="text-slate-800 p-5  sm:m-5 text-xl">
              <span className="font-semibold sm:text-2xl text-black">
                Description - {""}
              </span>
              {listing.description}
            </p>
            <div className="">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                breakpoints={{
                  // Define breakpoints for responsive behavior
                  390: {
                    slidesPerView: 2, // For screens smaller than 640px
                  },
                  1024: {
                    slidesPerView: 5, // For screens larger than or equal to 1024px
                  },
                }}
              >
                {listing.imageUrls.map((url: any) => (
                  <SwiperSlide key={url}>
                    <div
                      className="sm:h-[150px] h-[80px]  border sm:w-full bg-slate-200 rounded-3xl transition-opacity duration-300 "
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <style>
                {`
                .mySwiper .swiper-slide-thumb-active div {
                  opacity: 1 !important;
                }
              `}
              </style>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
