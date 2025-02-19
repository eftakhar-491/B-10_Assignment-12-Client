import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useTheme } from "../../Context/ThemeContext";
export default function ReviewModal({ data, setReviewModal }) {
  const [value, setValue] = useState(1);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { theme } = useTheme();
  async function handelReviewSubmit(e) {
    e.preventDefault();
    const obj = {
      rating: value,
      comment: e.target.comment.value,
      reviewDate: Date.now(),
      scholarshipId: data.scholarshipId,
      scholarshipName: data?.scholarshipDetails[0]?.scholarshipName,
      universityName: data?.scholarshipDetails[0]?.universityName,
      email: user?.email,
      userImage: user?.photoURL,
      userName: user?.displayName,
    };
    try {
      const res = await axiosSecure.post(`/reviews?email=${user?.email}`, obj);
      toast.success("Review Submitted");
      setReviewModal(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <section className="absolute z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div
          className={`max-w-[500px] w-full ${
            theme ? "bg-black" : "bg-white"
          } p-4 rounded-lg`}
        >
          <h1 className="flex mb-1 justify-between text-xl font-Lora">
            Review
            <span
              onClick={() => setReviewModal(false)}
              className="cursor-pointer active:scale-95"
            >
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
            className={`${
              theme
                ? "w-full bg-gray-500 border rounded-md text-white"
                : "text-black"
            }`}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <form onSubmit={handelReviewSubmit}>
            <textarea
              placeholder="Write your Comment here..."
              name="comment"
              rows={5}
              className={`rounded-md border-2 mt-2 w-full pl-4 ${
                theme ? "bg-gray-900" : "bg-white"
              }`}
            ></textarea>
            <button
              type="submit"
              className="active:scale-95 w-full text-sm md:text-lg border-2 border-blue-800 px-5  py-1 rounded-lg font-bold"
            >
              Send Review
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
