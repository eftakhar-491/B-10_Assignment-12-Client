import React, { useContext, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Firebase/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import StatusUpdateModal from "../ModalComponents/StatusUpdateModal";

export default function AppliedScholarship() {
  const [statusModal, setStatusModal] = useState(false);
  const [statusData, setStatusData] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: appliedData, refetch } = useQuery({
    queryKey: ["appliedScholarship"],
    enabled: user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applyed?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(appliedData);
  async function handelDeleteApply(id, data) {
    if (data.status == "Rejected")
      return toast("You already Rejected this Applyed Scholarship");
    try {
      // const res = await axiosSecure.delete(
      //   `/applyed/all/${id}?email=${user?.email}`
      // );

      const cancelRes = await axiosSecure.patch(
        `/applyed/status/${id}?email=${user?.email}`,
        {
          status: "Rejected",
        }
      );

      toast.warning("Applyed Scholarship Canceled Successfully");
      refetch();
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      {statusModal && (
        <StatusUpdateModal
          refetch={refetch}
          setStatusModal={setStatusModal}
          data={statusData}
        />
      )}
      <section className="md:ml-[320px] bg-white min-h-full">
        <OpenDrowerBTN />
        <div className="px-4">
          <h1 className="text-3xl pt-9 font-Lora font-semibold text-center">
            Applied Scholarships
          </h1>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full font-Roboto">
              <thead>
                <tr className="border-y-2 font-Lora">
                  <th className="border-r-2 py-3">Applicant Image</th>
                  <th className="border-r-2 py-3">Applicant name</th>
                  <th className="border-r-2">University Name</th>
                  <th className="border-r-2">Scholarship Category</th>

                  <th className="border-r-2">Status</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appliedData?.map((data, i) => (
                  <tr key={("APPLIEDDATA", i)} className="border-y-2">
                    <td className="border-r-2 py-2">
                      <img
                        className="w-12 h-12 rounded-full mx-auto"
                        src={data?.myImage}
                        alt="not found!"
                      />
                    </td>
                    <td className="border-r-2 py-2">{data?.name}</td>
                    <td className="border-r-2">{data?.universityName}</td>
                    <td className="border-r-2">{data?.scholarshipCategory}</td>

                    <td className="border-r-2">
                      <div className="flex justify-between">
                        {data?.status}
                        <span
                          onClick={() => {
                            setStatusModal(true);
                            setStatusData(data);
                          }}
                          title="Edit Status"
                          className="hover:text-blue-600  cursor-pointer"
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
                      </div>
                    </td>

                    <td className="flex gap-2 justify-evenly py-5 items-center">
                      <span
                        title="Feedback"
                        className="hover:text-blue-600  cursor-pointer"
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
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                      </span>
                      <span
                        title="Details"
                        className="hover:text-blue-600 cursor-pointer"
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
                        onClick={() => handelDeleteApply(data._id, data)}
                        title="Delete"
                        className="hover:text-red-600 cursor-pointer"
                      >
                        {/* <svg
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
                        </svg> */}
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
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
