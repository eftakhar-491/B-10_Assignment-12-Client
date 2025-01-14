import React from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";

export default function Profile() {
  return (
    <>
      <section className="relative md:ml-[320px] font-Roboto min-h-screen bg-white ">
        <OpenDrowerBTN />
        <div className="flex flex-col mt-auto min-h-screen items-center justify-center  py-10">
          <h1 className="text-3xl font-Lora font-semibold mb-3">
            User Profile
          </h1>
          <div className="flex items-center gap-10 ">
            <div className="relative">
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Avatar"
                className="w-40 h-40 rounded-full"
              />
              <h3 className="font-semibold absolute top-3 bg-blue-200/80 -right-8 text-sm border-2 border-blue-600 w-fit px-5 py-[1px] rounded-full">
                Admin
              </h3>
            </div>
            <div className="flex border-l-2 pl-10 flex-col items-start">
              <h2 className="text-xl font-bold font-Lora">John Doe</h2>
              <p className="text-lg">jhonDow@gmail.com</p>
              <div className="text-lg font-semibold border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-200 cursor-pointer active:scale-95">
                Update Profile
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
