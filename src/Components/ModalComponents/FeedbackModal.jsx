import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";

export default function FeedbackModal({ data, setFeedbackModal }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  async function handelFeedbackSubmit(e) {
    e.preventDefault();
    console.log("Feedback Submitted-->", data);
    setFeedbackModal(false);
    await axiosSecure.put(
      `/applyed/feedback/${data?._id}?email=${user?.email}`,
      {
        feedback: e.target.feedback.value,
      }
    );
  }
  return (
    <>
      <section className="absolute z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="max-w-[500px] w-full bg-white p-4 rounded-lg">
          <h1 className="flex justify-between text-xl font-Lora">
            Feedback
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
          <form onSubmit={handelFeedbackSubmit}>
            <textarea
              placeholder="Write your feedback here..."
              name="feedback"
              rows={5}
              className="border-2 mt-2 w-full pl-4"
            ></textarea>
            <button
              type="submit"
              className="active:scale-95 w-full text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold"
            >
              Send Feedback
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
