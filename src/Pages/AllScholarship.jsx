import React, { useEffect, useState } from "react";
import l from "../Assets/images/loading.gif";
import ScholarshipCard from "../Components/Shared/ScholarshipCard";
import bg from "../Assets/images/bg.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function AllScholarship() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {
    data: allScholarship,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APIURL
        }/scholarship?page=${page}&search=${search}`
      );
      return res.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [page]);
  const handelSearch = (e) => {
    e.preventDefault();

    setPage(1);
    refetch();
  };
  return (
    <>
      <section className="mt-[62px]">
        <div
          style={{
            backgroundImage: `linear-gradient(
            to bottom,
            rgba(0,0,0,.60),
            rgba(0,0,0,.60)
          ),url(${bg})`,
          }}
          className="max-w-[1900px] mx-auto rounded-lg py-20 text-white bg-cover bg-center bg-no-repeat"
        >
          <h1 className="text-3xl font-Lora font-semibold text-center">
            All Scholarship
          </h1>
          <p className="max-w-[600px] mx-auto text-center font-Roboto">
            You can easily find your own choise
          </p>
          <div className="max-w-[1900px] mx-auto text-black">
            <form
              onSubmit={handelSearch}
              className="w-11/12 md:w-[600px] h-12 flex mx-auto items-center gap-3  justify-center rounded-xl bg-white mt-10"
            >
              <input
                value={search}
                onChange={(e) => {
                  if (e.target.value === "") refetch();
                  setSearch(e.target.value);
                }}
                type="text"
                name="search"
                placeholder="Search with scholarship name, university name  or degree"
                className="placeholder:text-sm bg-transparent pl-5 h-full border-none outline-none w-full"
              />
              <button
                type="submit"
                className="border-2 h-full px-5 border-blue-800 hover:bg-blue-100 active:scale-95 rounded-xl"
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="min-h-[30vh] flex max-w-[1900px] mx-auto flex-wrap gap-8 px-[5%] justify-center mt-10">
          {isLoading && <img className="max-w-[200px]" src={l} />}
          {isError && <p>Something went wrong</p>}
          {allScholarship?.length === 0 && <p>No Scholarship Found</p>}
          {allScholarship?.length > 0 &&
            !isLoading &&
            !isError &&
            allScholarship?.map((scholarship, i) => (
              <ScholarshipCard key={i + "all"} data={scholarship} />
            ))}
        </div>
        <div>
          <div className="flex justify-center text-sm gap-1 mt-10">
            <button
              disabled={page == 1 ? true : false}
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
              className="disabled:bg-gray-400 disabled:border-gray-400 px-2 py-2 border-2 border-blue-400 rounded-md hover:bg-gray-200"
            >
              Previous
            </button>
            <button className="bg-blue-300 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-gray-200">
              {page}
            </button>
            {allScholarship?.length > 0 && (
              <>
                <button
                  disabled={allScholarship?.length === 0 ? true : false}
                  onClick={() => setPage(page + 1)}
                  className="disabled:bg-gray-400 disabled:border-gray-400 px-4 py-2 border-2 border-blue-400 rounded-md hover:bg-gray-200"
                >
                  {page + 1}
                </button>
                <button
                  disabled={allScholarship.length === 0 ? true : false}
                  onClick={() => setPage(page + 2)}
                  className="disabled:bg-gray-400 disabled:border-gray-400 px-4 py-2  border-2 border-blue-400 rounded-md hover:bg-gray-200"
                >
                  {page + 2} ...
                </button>
              </>
            )}

            <button
              disabled={
                !isLoading && allScholarship.length === 0 ? true : false
              }
              onClick={() => {
                setPage(page + 1);
              }}
              className="disabled:bg-gray-400 disabled:border-gray-400 px-2 py-2 border-2 border-blue-400 rounded-md hover:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
