import React from "react";
import { useTheme } from "../Context/ThemeContext";
export default function AboutUs() {
  const { theme } = useTheme();
  return (
    <>
      <section
        className={`${theme ? "bg-transparent" : "bg-gray-100"} py-10 mt-20`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
          <p className=" text-center mb-8 max-w-2xl mx-auto text-sm">
            Welcome to ScholarSphere, where we empower students to achieve their
            academic dreams through scholarships and educational resources.
          </p>
          <div className="flex flex-col md:flex-row justify-around gap-2 items-center">
            <div
              className={` shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 ${
                theme ? "bg-transparent border " : ""
              }`}
            >
              <img
                src="https://media.istockphoto.com/id/1413766112/photo/successful-mature-businessman-looking-at-camera-with-confidence.jpg?s=612x612&w=0&k=20&c=NJSugBzNuZqb7DJ8ZgLfYKb3qPr2EJMvKZ21Sj5Sfq4="
                alt="CEO"
                className="rounded-lg mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">John Doe</h3>
              <p className={` text-center ${theme ? "text-white" : ""}`}>
                CEO & Founder
              </p>
              <p className={` text-center mt-2 ${theme ? "text-white" : ""}`}>
                John is passionate about education and believes in making
                experience in the education sector, he leads ScholarSphere with
                a vision to transform lives through knowledge.
              </p>
            </div>
            <div
              className={`"bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 ${
                theme ? "bg-transparent border " : ""
              }`}
            >
              <img
                src="https://t3.ftcdn.net/jpg/01/80/80/28/360_F_180802852_C3Zm4g9avBz5osPEA769dF0KKp5cQZYT.jpg"
                alt="Team Member"
                className="rounded-lg mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">Jane Smith</h3>
              <p className={` text-center ${theme ? "text-white" : ""}`}>
                Co-Founder
              </p>
              <p className={`text-center mt-2 ${theme ? "text-white" : ""}`}>
                Jane is dedicated to helping students navigate their educational
                journeys. With her expertise in scholarship management, she
                ensures that every student has the opportunity to succeed.
              </p>
            </div>
            <div
              className={`shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 ${
                theme ? "bg-transparent border " : ""
              }`}
            >
              <img
                src="https://st4.depositphotos.com/13193658/22076/i/450/depositphotos_220768946-stock-photo-focused-african-american-businessman-working.jpg"
                alt="Manager"
                className="rounded-lg mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">
                Alice Johnson
              </h3>
              <p className={` text-center ${theme ? "text-white" : ""}`}>
                Operations Manager
              </p>
              <p className={` text-center mt-2 ${theme ? "text-white" : ""}`}>
                Jane is dedicated to helping students navigate their educational
                journeys. With her expertise in scholarship management, she
                ensures that every student has the opportunity to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </>
  );
}
