import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { toast } from "react-toastify";
export default function ContactUs() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast.success("Quary Sent Successfully");
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-10 mt-20 ${
        theme ? "bg-black border text-white" : "border bg-white text-black"
      }`}
    >
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Contact Information</h2>
        <p>Address: Uttora-10, Dhaka - Bangladesh</p>
        <p>Phone: 01539-995020, 01711-569569</p>
        <p>Email: contact@ScholarSphere.com</p>
      </div>
      <h1 className="text-3xl font-bold  my-6">Sent Your Quary_</h1>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex flex-col mb-4">
          <label className="mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`p-2 border border-gray-300 rounded ${
              theme ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`p-2 border border-gray-300 rounded ${
              theme ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={`p-2 border border-gray-300 rounded ${
              theme ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
