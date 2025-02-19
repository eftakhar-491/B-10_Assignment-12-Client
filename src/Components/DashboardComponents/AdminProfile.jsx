import React, { useContext, useEffect, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import l from "../../assets/images/loading.gif";
import StateContext from "../../Context/StateContext";

// import "./styles.css";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "../../Context/ThemeContext";
export default function AdminProfile() {
  const { theme } = useTheme();
  const { setSideBar } = useContext(StateContext);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

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
  const { data: chart } = useQuery({
    queryKey: ["chart"],
    enabled: user ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarship/chart?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <>
      <section
        className={`relative md:ml-[320px] font-Roboto min-h-screen ${
          theme ? "bg-black" : "bg-white"
        }`}
      >
        <OpenDrowerBTN setSideBar={setSideBar} />
        <div className="flex flex-col mt-auto items-center justify-start  py-10">
          <h1 className="text-3xl font-Lora font-semibold mb-3">
            Admin Profile
          </h1>
          {isError && (
            <h1 className="text-center text-sm text-red-400">
              Something problem please reload
            </h1>
          )}
          {!isError && isLoading ? (
            <img className="w-24 mx-auto" src={l} />
          ) : (
            <div
              className={`flex flex-col md:flex-row items-center gap-10 ${
                theme ? "bg-black text-white" : "text-black"
              }`}
            >
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
                {/* <div className="text-lg font-semibold border-2 border-blue-700 px-4 py-1 rounded-lg mt-5 hover:bg-blue-200 cursor-pointer active:scale-95">
                  Update Profile
                </div> */}
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="w-full mx-auto">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              width={500}
              height={400}
              data={chart}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 5,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="scholarshipName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalApplyed"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="Fees" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="totalReview" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}
