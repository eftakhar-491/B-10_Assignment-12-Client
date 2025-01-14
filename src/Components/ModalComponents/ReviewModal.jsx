import React, { useState } from "react";
import Rating from "@mui/material/Rating";
export default function ReviewModal() {
  const [value, setValue] = useState(1);
  return (
    <>
      <section className="absolute z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="max-w-[500px] w-full bg-white p-4 rounded-lg">
          <h1 className="flex mb-1 justify-between text-xl font-Lora">
            Review
            <span className="cursor-pointer active:scale-95">
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </h1>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <form>
            <textarea
              placeholder="Write your Comment here..."
              name=""
              id=""
              rows={5}
              className="border-2 mt-2 w-full pl-4"
            ></textarea>
            <button
              type="submit"
              className="active:scale-95 w-full text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold"
            >
              Send Review
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
