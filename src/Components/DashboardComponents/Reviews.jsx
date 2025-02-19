import React, { useContext, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";
import moment from "moment";
import { toast } from "react-toastify";
import UpdateReviewModal from "../ModalComponents/UpdateReviewModal";
import StateContext from "../../Context/StateContext";
import l from "../../assets/images/loading.gif";
import { useTheme } from "../../Context/ThemeContext";
export default function Reviews() {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [updateReviewModal, setUpdateReviewModal] = useState(false);
  const [updateReviewData, setUpdateReviewData] = useState(false);
  const { user } = useContext(AuthContext);
  const { setSideBar } = useContext(StateContext);

  const {
    data: reviews,

    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    enabled: user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data;
    },
  });
  async function handelReviewDelete(id) {
    try {
      const res = await axiosSecure.delete(
        `/reviews/${id}?email=${user?.email}`
      );

      refetch();
      toast.success("Review Deleted");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      {updateReviewModal && (
        <UpdateReviewModal
          refetch={refetch}
          data={updateReviewData}
          setUpdateReviewModal={setUpdateReviewModal}
        />
      )}
      <section
        className={`md:ml-[320px] ${
          theme ? "bg-black" : "bg-white"
        } min-h-full`}
      >
        <OpenDrowerBTN setSideBar={setSideBar} />
        <div className="px-4">
          <h1 className="text-3xl pt-9 font-Lora font-semibold text-center">
            Reviews
          </h1>
          <div className="overflow-x-auto mt-10">
            {isLoading ? (
              <img src={l} alt="" />
            ) : (
              <table className="table-auto w-full font-Roboto">
                <thead>
                  <tr className="border-y-2 font-Lora">
                    <th className="border-r-2 py-3">Scholarship Name</th>
                    <th className="border-r-2">University Name</th>
                    <th className="border-r-2">Comments</th>
                    <th className="border-r-2">Review date</th>

                    <th>Action</th>
                  </tr>
                </thead>
                {reviews?.length === 0 ? (
                  <tbody>
                    <tr className="border-y-2 ">
                      <td colSpan={9} className="text-center text-red-300">
                        No data found
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="">
                    {reviews?.map((review, i) => (
                      <tr key={i + "review"} className="border-y-2">
                        <td className="border-r-2 py-2">
                          {review?.scholarshipDetails[0]?.universityName}
                        </td>
                        <td className="border-r-2">
                          {review?.scholarshipDetails[0]?.universityCity},{" "}
                          {review?.scholarshipDetails[0]?.universityCountry}
                        </td>
                        <td className="border-r-2">{review?.comment}</td>
                        <td className="border-r-2">
                          {moment(review?.reviewDate).format("MM-DD-YYYY")}
                        </td>

                        <td className="flex gap-2 justify-evenly py-2 items-center">
                          <span
                            onClick={() => {
                              setUpdateReviewModal(true);
                              setUpdateReviewData(review);
                            }}
                            className="hover:text-blue-700 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </span>
                          <span
                            onClick={() => handelReviewDelete(review?._id)}
                            className="hover:text-red-600 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
