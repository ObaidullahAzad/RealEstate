import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";

export default function ListingCard({ listing }: any) {
  return (
    <div className="bg-cyan-50 max-w-[500px] max-h-[250px] sm:max-h-[300px] items-center flex shadow-md hover:shadow-lg hover:scale-105 transition-scale duration-300 transition-shadow  overflow-hidden rounded-2xl">
      <Link className="flex" to={`/listing/${listing._id}`}>
        <div className="p-2  w-[200px] items-center">
          <img
            src={
              listing.imageUrls[0] ||
              "https://images.ctfassets.net/n2ifzifcqscw/3QRMlAcJFrYAEAbhziixZW/d4b9aa50215c5ea7a161b8a6b59f1974/hero-real-estate-facts-trends.jpeg"
            }
            alt="listing cover"
            className=" h-[150px] sm:h-[180px] w-[500px] object-cover hover:scale-105 transition-scale duration-300 rounded-xl"
          />
        </div>
        <div className="p-3 max-w-[250px]">
          <p className="text-blue-500 text-lg  mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            <span className="text-sm text-slate-500">
              {listing.type === "rent" && " / month"}
            </span>
          </p>
          <p className="truncate text-lg font-semibold text-slate-700 ">
            {listing.name}
          </p>
          <div className="flex item-center gap-2 w-full m-2 ">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

          <div className="text-slate-700 text-nowrap  flex m-4 gap-4">
            <div className="font-bold text-xs sm:text-sm flex items-center p-1 rounded-lg gap-2 bg-blue-100">
              <IoBedOutline className="sm:text-3xl" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs sm:text-sm flex items-center p-1 rounded-lg gap-2 bg-blue-100">
              <PiBathtub className="sm:text-xl" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
