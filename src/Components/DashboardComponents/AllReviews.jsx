import React from "react";
import AllReviewsCard from "./AllReviewsCard";
import OpenDrowerBTN from "./OpenDrowerBTN";

export default function AllReviews() {
  return (
    <>
      <section className="md:ml-[320px] font-Roboto">
        <OpenDrowerBTN />
        <div>
          <h1 className="text-3xl pt-9 font-Lora font-semibold text-center">
            All reviews
          </h1>
        </div>
        <div className="flex justify-between p-4 flex-wrap gap-5 mt-7">
          <AllReviewsCard />
          <AllReviewsCard />
          <AllReviewsCard />
          <AllReviewsCard />
        </div>
      </section>
    </>
  );
}
