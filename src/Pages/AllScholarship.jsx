import React from "react";
import ScholarshipCard from "../Components/Shared/ScholarshipCard";
import bg from "../Assets/images/bg.png";
export default function AllScholarship() {
  return (
    <>
      <section>
        <div
          style={{
            backgroundImage: `linear-gradient(
            to bottom,
            rgba(0,0,0,.60),
            rgba(0,0,0,.60)
          ),url(${bg})`,
          }}
          className="max-w-[1900px] mx-auto rounded-lg py-20 text-white bg-cover bg-center bg-no-repeat"
        >
          <h1 className="text-3xl font-Lora font-semibold text-center">
            All Scholarship
          </h1>
          <p className="max-w-[600px] mx-auto text-center font-Roboto">
            You can easily find your own choise
          </p>
          <div className="max-w-[1900px] mx-auto text-black">
            <div className=" h-12 w-fit flex mx-auto items-center gap-3 justify-center rounded-xl bg-white mt-10">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent pl-5 h-full border-none outline-none w-[600px]"
              />
              <button className="border-2 h-full px-5 border-blue-800 hover:bg-blue-100 active:scale-95 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex max-w-[1900px] mx-auto flex-wrap gap-4 px-[5%] justify-evenly mt-10">
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
        </div>
      </section>
    </>
  );
}
