import React, { useContext, useEffect, useState } from "react";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useTheme } from "../../Context/ThemeContext";
export default function UpdateApplyedModal({ data, setUpdateModal, refetch }) {
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    village: "",
    district: "",
    country: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
  });
  useEffect(() => {
    setFormData({
      phoneNumber: data.phoneNumber,
      village: data.village,
      district: data.district,
      country: data.country,
      gender: data.gender,
      degree: data.degree,
      sscResult: data.sscResult,
      hscResult: data.hscResult,
      studyGap: data.studyGap,
      myImage: data?.myImage,
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  async function handelPhotoUpload(e) {
    e.preventDefault();
    setUploading(true);
    const file = e.target.files[0];
    const formdataphoto = new FormData();
    formdataphoto.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgbb_API_KEY
      }`,
      formdataphoto
    );

    setFormData({ ...formData, myImage: data.data.display_url });
    setUploading(false);
  }
  async function handelUpdateApplication(e) {
    e.preventDefault();

    if (uploading) return toast.warning("Please Wait Image is Uploading");
    try {
      await axiosSecure.patch(
        `/applyed/${data._id}?email=${user?.email}`,
        formData
      );
      toast.success("Application Updated Successfully");
      refetch();
      setUpdateModal(false);
    } catch (e) {
      toast.error("Something went wrong! Please try again");
    }
  }
  return (
    <>
      <section className=" fixed z-50 overflow-y-auto top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div
          className={`max-w-[500px] w-full ${
            theme ? "bg-black" : "bg-white"
          } mt-[400px] mb-10 p-4 rounded-lg`}
        >
          <h1 className=" mb-4 flex justify-between text-xl font-Lora">
            Update Applycation Form
            <span
              onClick={() => setUpdateModal(false)}
              className="cursor-pointer active:scale-95"
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
          </h1>
          <form onSubmit={handelUpdateApplication} className="space-y-4">
            <div>
              <img
                className="w-32 h-32 object-cover rounded-full mx-auto"
                src={formData?.myImage}
                alt=""
              />
              <label className="block text-sm font-medium mb-1">
                Your Image
              </label>
              <input
                name="photo"
                type="file"
                onChange={handelPhotoUpload}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
              />
              {uploading && (
                <p className="text-sm text-blue-500">Uploading...</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Your Country
              </label>
              <input
                required
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Your District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Village
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Degree</label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
                required
              >
                <option value="">Select</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  SSC Result
                </label>
                <input
                  type="number"
                  name="sscResult"
                  value={formData.sscResult}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 rounded ${
                    theme ? "bg-gray-900" : "bg-white"
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  HSC Result
                </label>
                <input
                  type="number"
                  name="hscResult"
                  value={formData.hscResult}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 rounded ${
                    theme ? "bg-gray-900" : "bg-white"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Study Gap(if 1 year plus)
              </label>
              <input
                type="number"
                name="studyGap"
                value={formData.studyGap}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  theme ? "bg-gray-900" : "bg-white"
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Applycation Info
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
