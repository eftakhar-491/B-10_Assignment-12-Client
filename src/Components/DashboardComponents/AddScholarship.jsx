import { useContext, useState } from "react";
import OpenDrowerBTN from "./OpenDrowerBTN";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Firebase/AuthProvider";
import StateContext from "../../Context/StateContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function AddScholarship() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",

    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    description: "",
  });

  const [uploading, setUploading] = useState(false);
  const { setSideBar } = useContext(StateContext);
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

    setFormData({ ...formData, universityImage: data.data.display_url });
    setUploading(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (uploading) {
      return toast.warning("Please Wait Image is Uploading");
    }
    try {
      await axiosSecure.post(`/scholarships?email=${user?.email}`, {
        ...formData,
        scholarshipPostDate: Date.now(),
        postedBy: user.email,
        rating: 0,
        totalReview: 0,
      });
      toast.success("Scholarship Added Successfully");
      setFormData({
        scholarshipName: "",
        universityName: "",
        // universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
      });
      e.target.photo.value = "";
    } catch (err) {
      toast.error("Something went wrong! Please try again");
    }
  }
  return (
    <>
      <section className="md:ml-[320px] bg-white h-content py-10 ">
        <OpenDrowerBTN setSideBar={setSideBar} />
        <div className="max-w-4xl mx-auto p-6  bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Add New Scholarship
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              Add Scholarship
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
