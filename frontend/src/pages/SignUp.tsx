import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.tsx";
import { toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        toast.warning(data.message);
        setError(data.message);
        return;
      }
      toast.success("You are signed up");
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="flex justify-evenly">
      <div className="p-5 m-8 w-[500px] mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7 ">
          Create your account
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <OAuth />
          <div className="relative flex items-center justify-center mb-2">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="absolute px-2 bg-white text-gray-500">or</span>
          </div>
          <input
            type="text"
            placeholder="username"
            className="border p-5 rounded-3xl"
            id="username"
            onChange={handleChange}
          ></input>
          <input
            type="email"
            placeholder="email"
            className="border p-5 rounded-3xl"
            id="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="password"
            className="border p-5 rounded-3xl"
            id="password"
            onChange={handleChange}
          ></input>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-4 rounded-3xl font-medium hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading.." : "Create Account"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/signin"}>
            <span className="text-blue-700">Sign in</span>
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
