import React from "react";
import ScholarshipCard from "../Shared/ScholarshipCard";

export default function TopScholarship() {
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
