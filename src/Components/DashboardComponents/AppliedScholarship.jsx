import React, { useContext, useEffect, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Firebase/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import StatusUpdateModal from "../ModalComponents/StatusUpdateModal";
import StateContext from "../../Context/StateContext";
import AppliedScholarshipDetailsModal from "../ModalComponents/AppliedScholarshipDetailsModal";
import FeedbackModal from "../ModalComponents/FeedbackModal";
import { useTheme } from "../../Context/ThemeContext";

export default function AppliedScholarship() {
  const { theme } = useTheme();

  const [filterApplication, setFilterApplication] = useState([]);

  const { setSideBar } = useContext(StateContext);
  const [applyDetailsModal, setApplyDetailsModal] = useState(false);
  const [applyDetailsData, setApplyDetailsData] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statusData, setStatusData] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const { data: appliedData, refetch } = useQuery({
    queryKey: ["appliedScholarship"],
    enabled: user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applyed/allApply/add?email=${user?.email}`
      );

      return res.data;
    },
  });

  async function handelDeleteApply(id, data) {
    if (data.status == "Rejected")
      return toast("You already Rejected this Applyed Scholarship");
    try {
      const cancelRes = await axiosSecure.patch(
        `/applyed/status/${id}?email=${user?.email}`,
        {
          status: "Rejected",
        }
      );

      refetch();
      toast.warning("Applyed Scholarship Canceled Successfully");
    } catch (error) {
      toast.error("Something went wrong! Refresh the page");
    }
  }

  function handelfilter(e) {
    const val = e.target.value;

    if (val === "All") {
      setFilterApplication([]);
    } else if (val === "applya") {
      const sort = [...appliedData].sort((a, b) => {
        return a?.paymentTime - b?.paymentTime;
      });

      setFilterApplication(sort);
    } else if (val === "applyd") {
      const sort = [...appliedData].sort((a, b) => {
        return b?.paymentTime - a?.paymentTime;
      });

      setFilterApplication(sort);
    } else if (val === "deadlinea") {
      const sort = [...appliedData].sort((a, b) => {
        return (
          new Date(a.scholarshipDetails[0]?.applicationDeadline) -
          new Date(b.scholarshipDetails[0]?.applicationDeadline)
        );
      });
      setFilterApplication(sort);
    } else if (val === "deadlined") {
      const sort = [...appliedData].sort((a, b) => {
        return (
          new Date(b.scholarshipDetails[0]?.applicationDeadline) -
          new Date(a.scholarshipDetails[0]?.applicationDeadline)
        );
      });
      setFilterApplication(sort);
    }
  }
  return (
    <>
      {feedbackModal && (
        <FeedbackModal
          refetch={refetch}
          setFeedbackModal={setFeedbackModal}
          data={feedbackData}
        />
      )}
      {applyDetailsModal && (
        <AppliedScholarshipDetailsModal
          data={applyDetailsData}
          setApplyDetailsModal={setApplyDetailsModal}
        />
      )}
      {statusModal && (
        <StatusUpdateModal
          refetch={refetch}
          setStatusModal={setStatusModal}
          data={statusData}
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
            Applied Scholarships
          </h1>
          <div className="flex justify-center mx-auto items-center mt-5 max-w-[500px] gap-4">
            {" "}
            <span className="flex-shrink-0">Filter By : </span>{" "}
            <select
              onChange={handelfilter}
              name="roleChange"
              className={`w-full p-2 border border-gray-300 rounded ${
                theme ? "bg-black" : "bg-white"
              }`}
            >
              <option value="All">All</option>
              <option value="applya">Apply Date(ASC)</option>
              <option value="applyd">Apply Date(DSC)</option>
              <option value="deadlinea">Deadline(ASC)</option>
              <option value="deadlined">Deadline(DSC)</option>
            </select>
          </div>
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
                {appliedData?.length === 0 && (
                  <tr>
                    <td
                      className="text-center py-2 border-b-2 text-sm text-red-500"
                      colSpan={6}
                    >
                      No applied found
                    </td>
                  </tr>
                )}
                {filterApplication?.map((data, i) => (
                  <tr key={("APPLIEDDATA", i)} className="border-y-2">
                    <td className="border-r-2 py-2">
                      <img
                        className="w-12 h-12 rounded-full mx-auto"
                        src={data?.myImage}
                        alt="not found!"
                      />
                    </td>
                    <td className="border-r-2 py-2">{data?.name}</td>
                    <td className="border-r-2">
                      {data?.universityName || (
                        <span className="text-red-600">
                          "apply form not field"
                        </span>
                      )}
                    </td>
                    <td className="border-r-2">
                      {data?.scholarshipCategory || (
                        <span className="text-red-600">
                          "apply form not field"
                        </span>
                      )}
                    </td>

                    <td className="border-r-2">
                      <div className="flex justify-between">
                        {data?.status || (
                          <span className="text-red-600">
                            "apply form not field"
                          </span>
                        )}
                        <span
                          onClick={() => {
                            if (data.status) {
                              setStatusModal(true);
                              setStatusData(data);
                            }
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
                        onClick={() => {
                          setFeedbackModal(true);
                          setFeedbackData(data);
                        }}
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
                        onClick={() => {
                          setApplyDetailsModal(true);
                          setApplyDetailsData(data);
                        }}
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
                {filterApplication?.length === 0 &&
                  appliedData?.map((data, i) => (
                    <tr key={("APPLIEDDATA", i)} className="border-y-2">
                      <td className="border-r-2 py-2">
                        <img
                          className="w-12 h-12 rounded-full mx-auto"
                          src={data?.myImage}
                          alt="not found!"
                        />
                      </td>
                      <td className="border-r-2 py-2">{data?.name}</td>
                      <td className="border-r-2">
                        {data?.universityName || (
                          <span className="text-red-600">
                            "apply form not field"
                          </span>
                        )}
                      </td>
                      <td className="border-r-2">
                        {data?.scholarshipCategory || (
                          <span className="text-red-600">
                            "apply form not field"
                          </span>
                        )}
                      </td>

                      <td className="border-r-2">
                        <div className="flex justify-between">
                          {data?.status || (
                            <span className="text-red-600">
                              "apply form not field"
                            </span>
                          )}
                          <span
                            onClick={() => {
                              if (data.status) {
                                setStatusModal(true);
                                setStatusData(data);
                              }
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
                          onClick={() => {
                            setFeedbackModal(true);
                            setFeedbackData(data);
                          }}
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
                          onClick={() => {
                            setApplyDetailsModal(true);
                            setApplyDetailsData(data);
                          }}
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
