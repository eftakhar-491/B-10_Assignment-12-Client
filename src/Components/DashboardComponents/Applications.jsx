import React, { useContext, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { AuthContext } from "../../Firebase/AuthProvider";
import ReviewModal from "../ModalComponents/ReviewModal";
import ApplyedDetailsForm from "../ModalComponents/ApplyedDetailsForm";
import UpdateApplyedModal from "../ModalComponents/UpdateApplyedModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Applications() {
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    data: applicationsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: user ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applyed/${user?.email}?email=${user?.email}`
      );
      return res.data;
    },
  });
  async function handelDelete(id) {
    try {
      await axiosSecure.delete(`/applyed/${id}?email=${user?.email}`);
      refetch();
    } catch (e) {
      console.log(e);
    }
  }

  console.log("-->", isLoading, user, applicationsData);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      {updateModal && (
        <UpdateApplyedModal
          refetch={refetch}
          data={updateData}
          setUpdateModal={setUpdateModal}
        />
      )}
      {reviewModal && (
        <ReviewModal data={reviewData} setReviewModal={setReviewModal} />
      )}
      <section className="md:ml-[320px] bg-white min-h-full">
        <OpenDrowerBTN />
        <div className="px-4">
          <h1 className="text-3xl pt-9 font-Lora font-semibold text-center">
            My Applications
          </h1>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full font-Roboto">
              <thead>
                <tr className="border-y-2 font-Lora">
                  <th className="border-r-2 py-3">University Name</th>
                  <th className="border-r-2">University Address</th>
                  <th className="border-r-2">Application Feedback</th>
                  <th className="border-r-2">Subject Category</th>
                  <th className="border-r-2">Applied Degree</th>
                  <th className="border-r-2">Application Fees</th>
                  <th className="border-r-2">Service Charge</th>
                  <th className="border-r-2">Status</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {user?.email &&
                  applicationsData.length > 0 &&
                  applicationsData?.map((item, i) => (
                    <tr key={i + "application"} className="border-y-2">
                      <td className="border-r-2 py-2">
                        {item?.universityName || (
                          <span className="text-sm text-red-500">
                            Update your Info
                          </span>
                        )}
                      </td>
                      <td className="border-r-2">
                        {item?.scholarshipDetails[0].universityCity},{" "}
                        {item?.scholarshipDetails[0].universityCountry}{" "}
                      </td>
                      <td className="border-r-2">
                        {item?.feedback || (
                          <span className="text-sm text-green-500">
                            no feedback yet
                          </span>
                        )}
                      </td>
                      <td className="border-r-2">
                        {item.scholarshipDetails[0].subjectCategory}
                      </td>
                      <td className="border-r-2">
                        {item.scholarshipDetails[0].degree}
                      </td>
                      <td className="border-r-2">
                        $ {item.scholarshipDetails[0].applicationFees}
                      </td>
                      <td className="border-r-2">
                        $ {item.scholarshipDetails[0].serviceCharge}
                      </td>
                      <td className="border-r-2">
                        {item.status || (
                          <span className="text-sm text-red-500">
                            Update your Info
                          </span>
                        )}
                      </td>

                      <td className="flex gap-2 justify-evenly py-2 items-center">
                        <span
                          title="Review"
                          onClick={() => {
                            setReviewModal(true);
                            setReviewData(item);
                          }}
                          className="cursor-pointer hover:text-green-700"
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
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                          </svg>
                        </span>
                        <span
                          title="Details"
                          onClick={() =>
                            navigate(
                              `/scholarshipdetails/${item?.scholarshipDetails[0]._id}`
                            )
                          }
                          className="cursor-pointer hover:text-blue-700"
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
                              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                          </svg>
                        </span>
                        <span
                          title="Update"
                          onClick={() => {
                            if (item?.status === "Pending")
                              return toast.warning(
                                "You can't update pending application"
                              );
                            setUpdateData(item);
                            setUpdateModal(true);
                          }}
                          className="cursor-pointer hover:text-orange-600"
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
                          title="Delete"
                          onClick={() => handelDelete(item._id)}
                          className="cursor-pointer hover:text-red-600"
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
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
