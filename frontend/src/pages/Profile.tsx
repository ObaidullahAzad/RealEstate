import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice.ts";
import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface FormData {
  avatar?: string; // Optional because it may not always be set
  username?: string;
  email?: string;
  password?: string;
}

export default function Profile() {
  const { currentUser, loading, error } = useSelector(
    (state: any) => state.user
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [imgUploadError, setImgUploadError] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListing] = useState([]);
  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageref = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPer(Math.round(progress));
      },
      (error: any) => {
        setImgUploadError(true);
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downlaodURL) => {
          setFormData({ ...formData, avatar: downlaodURL });
        });
      }
    );
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log("Cookies:", document.cookie); //
      dispatch(updateUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signout`
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {}
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/listing/${currentUser._id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false || data.length === 0) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };
  const handleListingDelete = async (listingId: any) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      setUserListing((prev) =>
        prev.filter((listing: any) => listing._id !== listingId)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };
  console.log(showListingError);
  return (
    <div className="flex-row sm:flex sm:justify-evenly  ">
      <div className="p-3 bg-slate-100 rounded-2xl m-8 sm:w-[500px] max-w-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
        <div className="flex justify-between items-center  p-4 text-center">
          <span
            onClick={handleSignOut}
            className="text-red-700 cursor-pointer text-3xl bg-red-300 p-1 rounded-full"
          >
            <FaSignOutAlt />
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e: any) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current && fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-[120px] w-[120px] object-cover cursor-pointer self-center mt-2"
          />
          <h1 className="text-3xl font-semibold text-center">
            Hello! {currentUser.username}
          </h1>
          <p className="text-sm self-center">
            {imgUploadError ? (
              <span className="text-red-700">Error Image upload</span>
            ) : imgPer > 0 && imgPer < 100 ? (
              <span className="text-slate-700">{`Uploading  ${imgPer} %`}</span>
            ) : imgPer === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded
              </span>
            ) : (
              ""
            )}
          </p>
          <Link
            className="bg-blue-300 text-white p-3 rounded-3xl uppercase text-center  hover:opacity-95 m-5 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser.username}
            className="border p-4 rounded-3xl"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-4 rounded-3xl"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border p-4 rounded-3xl"
            onChange={handleChange}
          />
          <div>
            <div className="flex justify-between mt-5">
              <span
                onClick={handleDeleteUser}
                className="text-red-700 font-semibold flex items-center p-3 gap-2 rounded-3xl bg-red-100 cursor-pointer"
              >
                <ImBin />
                Delete Account
              </span>

              <button
                disabled={loading}
                className="bg-slate-700 text-white font-semibold rounded-3xl p-3 uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "Loading....." : "Update"}
              </button>
            </div>
          </div>
        </form>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User Updated Successfully" : ""}
        </p>
        <button onClick={handleShowListing} className="text-green-700 w-full ">
          Show Listing
        </button>
      </div>

      <div className="bg-slate-100 rounded-3xl m-8 sm:w-[600px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <h1 className="text-center my-7 text-2xl font-semibold">
          Your Listings
        </h1>
        <p className="text-red-700 mt-5 text-center">
          {showListingError ? "Error Showing Listings" : ""}
        </p>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            {userListings.map((listing: any) => (
              <div
                key={listing._id}
                className=" bg-slate-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-4 sm:flex  justify-between items-center gap-4 m-8 hover:scale-105"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="Listing cover"
                    className="h-30 w-[120px] object-contain rounded-lg"
                  />
                </Link>

                <Link className="flex-1" to={`/listing/${listing._id}`}>
                  <p className="text-slate-700 text-lg mb-8 font-semibold  truncate ">
                    ${listing.regularPrice}
                    {listing.type === "rent" && (
                      <span className="tracking-widest text-sm text-slate-500 ">
                        /month
                      </span>
                    )}
                    <span className="block  m-2 hover:underline">
                      {listing.name}
                    </span>
                    <span className="text-xs flex items-center gap-1 truncate">
                      <FaLocationDot className="text-lg" />
                      {listing.address}
                    </span>
                  </p>
                </Link>
                <div className=" flex flex-col items-center gap-2 ">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 font-semibold uppercase bg-red-300 flex items-center gap-1 p-1 rounded-xl hover:bg-red-50"
                  >
                    <ImBin />
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-blue-700 bg-blue-200 uppercase flex items-center gap-1 p-1 rounded-xl hover:bg-blue-50">
                      <FaEdit />
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
