import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailue,
} from "../redux/user/userSlice.ts";
import OAuth from "../components/OAuth.tsx";
import { toast } from "react-toastify";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailue(data.message));
        return;
      }
      toast.success("Signed In Successfully!");
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error: any) {
      dispatch(signInFailue(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="flex justify-evenly">
      <div className="p-5 m-8 w-[500px] mx-auto">
        <h1 className="text-3xl text-center font-semibold my-4 ">
          Welcome Back
        </h1>
        <p className="text-center text-slate-700">Please enter your details</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <OAuth />
          <div className="relative flex items-center justify-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="absolute px-2 bg-white text-gray-500">or</span>
          </div>
          <input
            type="text"
            placeholder="username"
            className="border p-5 m-2 rounded-3xl"
            id="username"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="password"
            className="border p-5 m-2 rounded-3xl"
            id="password"
            onChange={handleChange}
          ></input>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-4 rounded-3xl font-medium hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading.." : "Login In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to={"/signup"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
      <div className="m-8 rounded-3xl bg-blue-400 hidden sm:block">
        <img
          className="rounded-3xl max-w-2xl h-screen"
          src="https://d1di04ifehjy6m.cloudfront.net/media/filer_public/c0/56/c056536f-4630-490a-84fe-9820270e7435/adobestock_740032930_1.png"
        ></img>
      </div>
    </div>
  );
}
