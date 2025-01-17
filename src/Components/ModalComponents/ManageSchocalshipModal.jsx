import React, { useContext, useState } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function ManageSchocalshipModal({
  data,
  setManageScholarshipModal,
  refetch,
}) {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    scholarshipName: data?.scholarshipName,
    universityName: data.universityName,
    universityCountry: data.universityCountry,
    universityCity: data.universityCity,
    universityWorldRank: data.universityWorldRank,
    subjectCategory: data.subjectCategory,
    scholarshipCategory: data.scholarshipCategory,
    degree: data.degree,
    tuitionFees: data.tuitionFees,
    applicationFees: data.applicationFees,
    serviceCharge: data.serviceCharge,
    applicationDeadline: data.applicationDeadline,
    description: data.description,
    universityImage: data.universityImage,
  });

  const [uploading, setUploading] = useState(false);
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
  async function handelUpdate(e) {
    e.preventDefault();
    if (uploading) return toast.warning("Please wait for image uploading...");

    try {
      const res = await axiosSecure.patch(
        `/scholarship/${data._id}?email=${user?.email}`,
        formData
      );
      refetch();
      setManageScholarshipModal(false);
      toast.success("Scholarship Updated");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <section className="fixed z-[80] w-screen h-screen top-0 left-0 bg-black/50 h-content py-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6  bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-2xl font-Lora font-bold mb-6 flex items-center justify-between">
            Update Scholarship
            <span
              onClick={() => setManageScholarshipModal(false)}
              className="cursor-pointer"
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
          <form onSubmit={handelUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Scholarship Name
              </label>
              <input
                type="text"
                name="scholarshipName"
                value={formData.scholarshipName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>

              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                University Name
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <img
                className="w-20 h-16 rounded-full object-cover"
                src={formData.universityImage}
                alt="not found!"
              />
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
                University Country
              </label>
              <input
                type="text"
                name="universityCountry"
                value={formData.universityCountry}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                University City
              </label>
              <input
                type="text"
                name="universityCity"
                value={formData.universityCity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                University World Rank
              </label>
              <input
                type="number"
                name="universityWorldRank"
                value={formData.universityWorldRank}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Subject Category
              </label>
              <select
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
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
                value={formData.scholarshipCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Tuition Fees (Optional)
              </label>
              <input
                type="number"
                name="tuitionFees"
                value={formData.tuitionFees}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Application Fees
              </label>
              <input
                type="number"
                name="applicationFees"
                value={formData.applicationFees}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Service Charge
              </label>
              <input
                type="number"
                name="serviceCharge"
                value={formData.serviceCharge}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Scholarship
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
