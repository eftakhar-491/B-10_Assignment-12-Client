import React from "react";
import ScholarshipCard from "../Shared/ScholarshipCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TopScholarship() {
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
        <div className="flex max-w-[1900px] mx-auto flex-wrap gap-4 px-[5%] justify-evenly mt-10">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong</p>}
          {topScholarship?.map((scholarship, i) => (
            <ScholarshipCard key={i + "t"} data={scholarship} />
          ))}
        </div>
      </section>
    </>
  );
}
