import moment from "moment";
import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";

export default function AllReviewsCard({ data, refetch }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  async function handelReviewDelete(id) {
    try {
      const res = await axiosSecure.delete(
        `/reviews/${id}?email=${user?.email}`
      );
      refetch();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex-1 min-w-[340px] max-w-[500px] bg-white p-4 rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src={data?.userImage}
            alt=""
          />
          <div>
            <h2 className="text-sm font-semibold">{data?.userName}</h2>
            <p className="text-sm font-medium">
              {moment(data?.reviewDate).format("MM-DD-YYYY")}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <h2 className="text-sm font-semibold text-left">
            {data?.universityName}
          </h2>
          <p className="text-lg font-medium flex items-center gap-1">
            {data?.rating}.0
            <span className="text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm bg-blue-100 px-4 py-1 border-2 border-blue-800 w-fit rounded-2xl">
          {data?.scholarshipDetails[0].subjectCategory}
        </p>
        <p className="p-3 text-lg mt-0">
          <span className="font-semibold">comment : </span>
          {data?.comment}
        </p>
      </div>
      <button
        onClick={() => handelReviewDelete(data?._id)}
        className="text-lg w-full border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-red-200 hover:border-red-600 active:scale-95"
      >
        Delete Review
      </button>
    </div>
  );
}
