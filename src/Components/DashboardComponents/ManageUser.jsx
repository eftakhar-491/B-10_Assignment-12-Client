import React, { useContext, useEffect, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import StateContext from "../../Context/StateContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";
import { toast } from "react-toastify";

export default function ManageUser() {
  const { setSideBar } = useContext(StateContext);
  const [updateEmail, setUpdateEmail] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: allUsers, refetch } = useQuery({
    queryKey: ["allUsersadmin"],
    enabled: user?.email ? true : false,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/all/admin?email=${user?.email}&filter=${filterRole}`
      );
      return res.data;
    },
  });
  console.log(updateEmail);
  async function handelRoleChange(e) {
    console.log(e.target.value);
    try {
      const res = await axiosSecure.patch(
        `/users/admin/role/${updateEmail}?email=${user?.email}`,
        { role: e.target.value }
      );
      toast.success("Role Updated");
      refetch();
      console.log(res.data);
    } catch (err) {
      toast.error("Something went wrong! Refresh the page");
    }
  }
  async function handelUserDelete(email) {
    try {
      const res = await axiosSecure.delete(
        `/users/admin/delete/${email}?email=${user?.email}`
      );
      res.status === 200 && toast.success("User Deleted");
      refetch();
    } catch (err) {
      toast.error("Something went wrong! Refresh the page");
    }
  }
  useEffect(() => {
    refetch();
  }, [filterRole]);
  console.log("manageuser-->", allUsers, user);
  return (
    <>
      <section className="relative md:ml-[320px] font-Roboto min-h-screen bg-white ">
        <OpenDrowerBTN setSideBar={setSideBar} />
        <div className="flex flex-col mt-auto items-center justify-start px-4 py-10">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <div className="flex items-center mt-5 max-w-[500px] gap-4">
            {" "}
            <span className="flex-shrink-0">Filter By Role: </span>{" "}
            <select
              name="roleChange"
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="All">All</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="overflow-x-auto mt-10 w-full">
            <table className="table-auto font-Roboto w-full">
              <thead>
                <tr className="border-y-2 font-Lora">
                  <th className="border-r-2 py-3">User Name</th>
                  <th className="border-r-2">User Email</th>
                  <th className="border-r-2">User Role</th>
                  <th className="border-r-2">Action</th>
                  <th>delete</th>
                </tr>
              </thead>

              <tbody className="">
                {allUsers?.map((item, i) => (
                  <tr key={("user", i)} className="border-y-2">
                    <td className="border-r-2 py-2">{item?.name}</td>
                    <td className="border-r-2">{item?.email}</td>
                    <td className="border-r-2">{item?.role}</td>
                    <td
                      onClick={() => setUpdateEmail(item?.email)}
                      className="border-r-2"
                    >
                      <select
                        name="roleChange"
                        value={item?.role}
                        onChange={handelRoleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="User">User</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td
                      onClick={() => handelUserDelete(item?.email)}
                      className="cursor-pointer hover:underline text-red-400 text-sm text-center"
                    >
                      Delete
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
