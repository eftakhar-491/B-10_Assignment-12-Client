import moment from "moment";
import React from "react";
import { useTheme } from "../../Context/ThemeContext";
export default function AppliedScholarshipDetailsModal({
  data,
  setApplyDetailsModal,
}) {
  const { theme } = useTheme();
  return (
    <>
      <section className="fixed top-0 left-0 z-50  bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
        <div className="overflow-y-auto w-full h-full">
          <div
            className={`border max-w-[1000px] mx-auto mt-[80px] ${
              theme ? "bg-black" : "bg-white"
            } p-5 rounded-lg`}
          >
            <h1 className="font-Lora font-semibold text-center mb-3 text-2xl">
              Applied Details{" "}
            </h1>
            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-5">
              <img
                className="md:w-[300px] rounded-lg"
                src={data?.myImage}
                alt=""
              />
              <div>
                <h1 className="text-xl font bold">
                  <span className="font-semibold">University Name: </span>{" "}
                  {data?.universityName}
                </h1>
                <p>
                  <span className="font-semibold">Country: </span>{" "}
                  {data?.scholarshipDetails[0]?.universityCountry}
                </p>
                <p>
                  <span className="font-semibold">City: </span>
                  {data?.scholarshipDetails[0]?.universityCity}
                </p>
                <p>
                  <span className="font-semibold">Degree: </span>
                  {data?.scholarshipDetails[0]?.degree}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Deadline: </span>{" "}
                  {data?.scholarshipDetails[0]?.applicationDeadline}
                </p>
              </div>
            </div>
            <hr />
            <div className="mt-6">
              <p className="text-sm border-2 border-blue-700 w-fit px-4 rounded-3xl">
                {data?.scholarshipDetails[0]?.scholarshipCategory}
              </p>
              <p>
                <span className="font-semibold">Description: </span>
                {data?.scholarshipDetails[0]?.description || "No Description"}
              </p>
              <p>
                <span className="font-semibold">World Rank: </span>
                {data?.scholarshipDetails[0]?.universityWorldRank}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Subject name: </span>
                {data?.scholarshipDetails[0]?.subjectCategory}
              </p>
              <p>
                {" "}
                <span className="font-semibold">Posted By: </span>
                {data?.scholarshipDetails[0]?.postedBy}
              </p>
              <p>
                <span className="font-semibold">Post date: </span>
                {moment(
                  data?.scholarshipDetails[0]?.scholarshipPostDate
                ).format("MM-DD-YYYY")}
              </p>
              <p>
                <span className="font-semibold">Application fees (USD): </span>${" "}
                {data?.scholarshipDetails[0]?.applicationFees}
              </p>
              <p>
                <span className="font-semibold">Service charge (USD): </span>${" "}
                {data?.scholarshipDetails[0]?.serviceCharge}
              </p>
              <p>
                <span className="font-semibold">Service charge (USD): </span>${" "}
                {data?.scholarshipDetails[0]?.tuitionFees}
              </p>
            </div>
            <button
              onClick={() => {
                setApplyDetailsModal(false);
              }}
              className="mt-3 w-full active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
