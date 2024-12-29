import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    sale: false,
    parking: false,
    furnished: false,
  });

  const [imgUploadError, setImageUploadError] = useState<string | boolean>(
    false
  );
  const [upload, setUpload] = useState(false);
  const [submitError, setSubmitError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUpload(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls: any) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUpload(false);
        })
        .catch((err: any) => {
          setImageUploadError("Image upload failed (2 mb max) ");
          setUpload(false);
          console.log(err);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUpload(false);
    }
  };
  const storeImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((err) => reject(err));
        }
      );
    });
  };
  const handleRemoveImage = (index: any) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e: any) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (formData.imageUrls.length < 1)
        return setSubmitError("Your must upload 1 image for listing");
      if (+formData.regularPrice < +formData.discountPrice)
        return setSubmitError(
          "regular price must be greater than discounted price"
        );
      setLoading(true);
      setSubmitError(false);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/listing/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setSubmitError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error: any) {
      setSubmitError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-4 rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
            id="name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-4 rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-4 rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
            id="address"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap  ">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 "
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min={1}
                  max={100000}
                  required
                  className="p-3 border border-gray-300 rounded-3xl focus:outline-none focus:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] "
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($/month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min={1}
                    max={100000}
                    required
                    className="p-3 border border-gray-300 rounded-3xl"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted Price</p>
                    <span className="text-xs">
                      {formData.type === "rent" && (
                        <span className="text-xs">($/month)</span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">Images:</p>
          <span className="font-normal text-gray-600 ml-2">
            The first image will be a cover (max 6)
          </span>
          <div className="flex gap-4">
            <input
              onChange={(e: any) => setFiles(e.target.files)}
              type="file"
              id="image"
              className="border p-3 rounded-3xl w-full"
              accept="image/*"
              multiple
              required
            />
            <button
              type="button"
              disabled={upload}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {upload ? "Uploading...." : "Upload"}
            </button>
          </div>
          <p className="text-red-700">{imgUploadError && imgUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image "
                  className="w-20 h-20 object-contain rounded-3xl"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-3xl uppercase hover:opacity-95 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || upload}
            className="p-3 bg-slate-950 text-white rounded-3xl hover:opacity-95 disabled:opacity-80 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {submitError && <p className="text-red-700 text-sm">{submitError}</p>}
        </div>
      </form>
    </main>
  );
}
