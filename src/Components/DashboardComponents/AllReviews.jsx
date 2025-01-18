import React, { useContext } from "react";
import AllReviewsCard from "./AllReviewsCard";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { AuthContext } from "../../Firebase/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AllReviews() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: allreviews, refetch } = useQuery({
    queryKey: ["allreviews"],
    enabled: user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/all?email=${user?.email}`);
      return res.data;
    },
  });
  console.log("allreviews-->", allreviews);
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
          {allreviews?.map((review) => (
            <AllReviewsCard key={review._id} data={review} refetch={refetch} />
          ))}
        </div>
      </section>
    </>
  );
}
