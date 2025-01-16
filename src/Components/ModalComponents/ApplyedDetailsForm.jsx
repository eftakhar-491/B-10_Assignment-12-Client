import axios from "axios";
import React, { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { AuthContext } from "../../Firebase/AuthProvider";
import StateContext from "../../Context/StateContext";

export default function ApplyedDetailsForm({ data }) {
  const { setApplyModal } = useContext(StateContext);
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
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
    universityName: data.universityName,
    subjectCategory: data.subjectCategory,
    scholarshipCategory: data.scholarshipCategory,
  });
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
    console.log(data.data.display_url);
    setFormData({ ...formData, universityImage: data.data.display_url });
    setUploading(false);
  }
  async function handleApplySubmit(e) {
    e.preventDefault();
    if (uploading) return toast.warning("Please Wait Image is Uploading");
    console.log(formData);
    const res = await axiosSecure.put("/applyed", {
      ...formData,
      email: user?.email,
      scholarshipId: data._id,
      status: "Pending",
    });

    if (res.status === 200) setApplyModal(false);
  }

  return (
    <>
      <section className=" absolute z-50 overflow-y-auto top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="max-w-[500px] w-full bg-white mt-[500px] mb-10 p-4 rounded-lg">
          <h1 className=" mb-4 flex justify-between text-xl font-Lora">
            Applycation Form
            <span className="cursor-pointer active:scale-95">
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
          <form onSubmit={handleApplySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                University Name
              </label>
              <input
                type="text"
                value={data.universityName}
                name="universityName"
                className="w-full p-2 border border-gray-300 rounded"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Subject Category
              </label>
              <select
                name="subjectCategory"
                value={data.subjectCategory}
                className="w-full p-2 border border-gray-300 rounded"
                disabled
              >
                <option value="">Select</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Scholarship Category
              </label>
              <select
                name="scholarshipCategory"
                value={data.scholarshipCategory}
                className="w-full p-2 border border-gray-300 rounded"
                disabled
              >
                <option value="">Select</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                University Image/Logo
              </label>
              <input
                name="photo"
                required
                type="file"
                onChange={handelPhotoUpload}
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
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
                  className="w-full p-2 border border-gray-300 rounded"
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
                  className="w-full p-2 border border-gray-300 rounded"
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
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
