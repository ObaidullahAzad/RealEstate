import { FaStar } from "react-icons/fa";

export default function ReviewCard() {
  return (
    <div className="bg-slate-200 w-[360px] h-[400px]   flex flex-col justify-start rounded-3xl">
      <div className="flex ml-4 p-4 gap-3">
        <img
          className="border-4 border-slate-400 w-[45px] h-[50px] rounded-full"
          src="https://i.pinimg.com/originals/49/d5/b2/49d5b215b12847a876d5e888a9c5b5c5.jpg"
        />
        <div className="">
          <p className="flex flex-col font-semibold text-xl">Gojo Satoru</p>
          <p className="flex flex-col">Old Tenant</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xl">
          Working With Garment Was A Game-Changer! Their Team's Deep Knowledge
          Of The Market And Unwavering Dedication Made My Home- Buying Process A
          Breeze. I...
        </p>
      </div>
      <hr className="w-full  border-t-2 border-slate-400 mt-10" />
      <div className="flex items-center gap-10 p-3">
        <p className="w-[200px] font-semibold text-lg p-1">
          Lets see Gojo Satoru's Rating
        </p>
        <div className="flex flex-1   gap-2">
          <FaStar className="text-2xl" />
          <p className="text-lg font-semibold">4.6</p>
        </div>
      </div>
    </div>
  );
}
