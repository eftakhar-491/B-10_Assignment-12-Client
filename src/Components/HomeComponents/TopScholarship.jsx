import React from "react";
import ScholarshipCard from "../Shared/ScholarshipCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import l from "../../assets/images/loading.gif";
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

        <div className="flex items-center flex-wrap justify-center max-w-[1900px] mx-auto gap-4 px-[5%] mt-10">
          {isLoading && (
            <div className="md:col-span-2 col-span-1 lg:col-span-3 flex justify-center items-center w-full">
              <img className="max-w-[250px] mx-auto" src={l} alt="loading.." />
            </div>
          )}
          {isError && (
            <p className="col-span-3 text-center text-sm text-red-600">
              Something went wrong
            </p>
          )}
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
