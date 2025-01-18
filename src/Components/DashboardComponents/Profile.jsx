import React, { useContext, useEffect, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import StateContext from "../../Context/StateContext";
import l from "../../assets/images/loading.gif";
export default function Profile() {
  const { setSideBar } = useContext(StateContext);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // const [userData, setUserData] = useState({});
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: user ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user?.email}?email=${user?.email}`
      );
      return res.data;
    },
  });
  console.log(user);
  console.log("userData-->", userData);
  return (
    <>
      <section className="relative md:ml-[320px] font-Roboto min-h-screen bg-white ">
        <OpenDrowerBTN setSideBar={setSideBar} />
        <div className="flex flex-col mt-auto min-h-screen items-center justify-center  py-10">
          <h1 className="text-3xl font-Lora font-semibold mb-3">
            User Profile
          </h1>
          {isError && (
            <h1 className="text-center text-sm text-red-400">
              Something problem please reload
            </h1>
          )}
          {!isError && isLoading ? (
            <img className="w-24 mx-auto" src={l} />
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-10 ">
              <div className="relative">
                <img
                  src={userData?.imageUrl}
                  alt="Profil Image"
                  className="w-40 border object-cover h-40 rounded-full"
                />
                <h3 className="font-semibold absolute top-3 bg-blue-200/80 -right-8 text-sm border-2 border-blue-600 w-fit px-5 py-[1px] rounded-full">
                  {userData?.role}
                </h3>
              </div>
              <div className="flex border-l-2 pl-10 flex-col items-start">
                <h2 className="text-xl font-bold font-Lora">
                  {userData?.name}
                </h2>
                <p className="text-lg">{userData?.email}</p>
                <div className="text-lg font-semibold border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-200 cursor-pointer active:scale-95">
                  Update Profile
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
