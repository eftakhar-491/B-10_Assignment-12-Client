import React from "react";
import AllReviewsCard from "./AllReviewsCard";

export default function AllReviews() {
  return (
    <>
      <section className="ml-[320px] font-Roboto">
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
