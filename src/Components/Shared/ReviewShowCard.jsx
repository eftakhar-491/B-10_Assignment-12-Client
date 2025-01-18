import moment from "moment";
import React from "react";

export default function ReviewShowCard({ data }) {
  return (
    <div>
      <div className="mx-auto flex-1 min-w-[300px] max-w-[800px] py-10 p-4 rounded-lg ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 rounded-full"
              src={data?.userImage}
              alt=""
            />
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                {data?.userName}
              </h2>
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
          <p className=" text-lg mt-3">
            <span className="font-semibold">comment : </span>
            {data?.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
