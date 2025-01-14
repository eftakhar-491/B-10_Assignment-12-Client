import React from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";

export default function MangeScholarship() {
  return (
    <>
      <section className="md:ml-[320px]  bg-white min-h-full">
        <OpenDrowerBTN />
        <div className="px-4">
          <h1 className="text-3xl pt-9 font-Lora font-semibold text-center">
            Mange Scholarship
          </h1>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full font-Roboto">
              <thead>
                <tr className="border-y-2 font-Lora">
                  <th className="border-r-2 py-3">Scholarship Name</th>
                  <th className="border-r-2">University Name</th>
                  <th className="border-r-2">Subject Category</th>
                  <th className="border-r-2">Degree</th>
                  <th className="border-r-2">Application Fees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-y-2">
                  <td className="border-r-2 py-2">University Name</td>
                  <td className="border-r-2">University Address</td>
                  <td className="border-r-2">Application Feedback</td>
                  <td className="border-r-2">Subject Category</td>
                  <td className="border-r-2">Applied Degree</td>

                  <td className="flex gap-2 justify-evenly py-2 items-center">
                    <span
                      title="Show Details"
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </span>
                    <span className="hover:text-blue-700 cursor-pointer">
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
                    <span className="hover:text-red-600 cursor-pointer">
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
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
