import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";
import { toast } from "react-toastify";

export default function StatusUpdateModal({ data, setStatusModal, refetch }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  async function handelStatusUpdate(e) {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(
        `/applyed/status/${data._id}?email=${user?.email}`,
        {
          status: e.target.status.value,
        }
      );
      refetch();
      console.log(res);
      toast.success("Status Updated Successfully");
      setStatusModal(false);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <section className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg w-[300px] md:w-[500px]">
          <form
            onSubmit={handelStatusUpdate}
            className="w-full flex flex-col gap-5"
          >
            <div className="w-full">
              <label
                htmlFor="status"
                className="flex items-center text-xl font-semibold font-Lora mb-3 justify-between"
              >
                Status
                <span
                  className="cursor-pointer"
                  onClick={() => setStatusModal(false)}
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
              </label>
              <select
                defaultValue={data?.status}
                id="status"
                name="status"
                className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-blue-200"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              className="text-lg border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-200 active:scale-95"
              type="submit"
            >
              Update Status
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
