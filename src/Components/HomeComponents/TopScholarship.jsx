import React from "react";
import ScholarshipCard from "../Shared/ScholarshipCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TopScholarship() {
  const navigate = useNavigate();
  const {
    data: topScholarship,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/scholarship/topScholarship`
      );
      return res.data;
    },
  });
  console.log(topScholarship);
  return (
    <>
      <section className="mt-16">
        <div>
          <h1 className="text-center text-3xl font-semibold font-Lora">
            Top Scholarship
          </h1>
          <p className="text-center max-w-[600px] font-Roboto mt-1 mx-auto  ">
            Unlock opportunities with the best scholarships tailored to your
            goals.
          </p>
        </div>
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1900px] mx-auto gap-4 px-[5%] mt-10">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong</p>}
          {topScholarship?.map((scholarship, i) => (
            <ScholarshipCard key={i + "t"} data={scholarship} />
          ))}
        </div>
        <div>
          <button
            onClick={() => navigate("/scholarships")}
            className="text-lg border-2 mb-10 mx-auto border-blue-700 px-4 py-1 rounded-lg mt-10 hover:bg-blue-200 block active:scale-95"
          >
            -- Show All Scholarship --
          </button>
        </div>
      </section>
    </>
  );
}
