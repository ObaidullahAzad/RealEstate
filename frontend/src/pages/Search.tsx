import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

interface Listing {
  _id: string;
  title: string;
  price: number;
}

export default function Search() {
  const [sidebarData, setsidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<Listing[]>([]);
  const [showmore, setShowmore] = useState(false);
  console.log(listing);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const parkingUrl = urlParams.get("parking") == "true" ? true : false;
    const furnishedUrl = urlParams.get("furnished") == "true" ? true : false;
    const offerUrl = urlParams.get("offer") == "true" ? true : false;
    const sortUrl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");

    if (
      searchTermFormUrl ||
      typeUrl ||
      parkingUrl ||
      furnishedUrl ||
      offerUrl ||
      sortUrl ||
      orderUrl
    ) {
      setsidebarData({
        searchTerm: searchTermFormUrl || "",
        type: typeUrl || "all",
        parking: parkingUrl || "true" ? false : true,
        furnished: furnishedUrl || "true" ? false : true,
        offer: offerUrl || "true" ? false : true,
        sort: sortUrl || "created_at",
        order: orderUrl || "desc",
      });
    }
    const fetchListing = async () => {
      setLoading(true);
      setShowmore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing/get?${searchQuery}`
      );
      const data: Listing[] = await res.json();
      if (data.length > 9) {
        setShowmore(true);
      } else {
        setShowmore(false);
      }
      setListing(data);
      console.log(data);
      setLoading(false);
    };
    fetchListing();
  }, [location.search]);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setsidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setsidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setsidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setsidebarData({ ...sidebarData, sort, order });
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking.toString());
    urlParams.set("furnished", sidebarData.furnished.toString());
    urlParams.set("offer", sidebarData.offer.toString());
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const onClickShowMore = async () => {
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listing/get?${searchQuery}`
    );
    const data = await res.json();
    if (data.length < 9) {
      setShowmore(false);
    }
    setListing([...listing, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>

            <input
              type="text"
              id="searchTerm"
              placeholder="Search...."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <p className="text-xl">Filters</p>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Amenities</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div>
            <label>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value={"regularPrice_desc"}>Price High to Low</option>
              <option value={"regularPrice_asc"}>Price Low to High</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-800 text-white p-3 rounded-3xl  hover:opacity-95 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Search Results
        </h1>
        <div className="p-7 flex flex-col gap-4">
          {!loading && listing.length === 0 && (
            <p className="text-xl text-slate-700">No Listing Found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listing &&
            listing.map((listing: any) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          {showmore && (
            <button
              className="text-green-700 hover:underline p-7"
              onClick={onClickShowMore}
            >
              Show More...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
