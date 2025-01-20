import React, { useContext } from "react";
import AllReviewsCard from "./AllReviewsCard";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { AuthContext } from "../../Firebase/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import StateContext from "../../Context/StateContext";
import { toast } from "react-toastify";
import l from "../../assets/images/loading.gif";

export default function AllReviews() {
  const { user } = useContext(AuthContext);
  const { setSideBar } = useContext(StateContext);

  const axiosSecure = useAxiosSecure();
  const {
    data: allreviews,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allreviews"],
    enabled: user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/all?email=${user?.email}`);

      return res.data;
    },
  });

  return (
    <>
      <section className="md:ml-[320px] font-Roboto min-h-[90vh] pb-10 bg-[#e4e4e4d6]">
        <OpenDrowerBTN setSideBar={setSideBar} />
        <div>
          <h1 className="text-3xl pt-9 font-Lora font-semibold text-center">
            All reviews
          </h1>
        </div>
        {isLoading ? (
          <img className="max-w-[200px] mx-auto" src={l} alt="" />
        ) : (
          <div className="p-4 justify-center lg:justify-start flex flex-wrap gap-4  mt-7">
            {allreviews?.map((review) => (
              <AllReviewsCard
                key={review._id}
                data={review}
                refetch={refetch}
              />
            ))}
          </div>
        )}
        {allreviews?.length === 0 && (
          <div className="flex justify-center items-center h-[50vh]">
            <h1 className="text-xl text-red-400 font-semibold">
              No Reviews Found
            </h1>
          </div>
        )}
      </section>
    </>
  );
}
