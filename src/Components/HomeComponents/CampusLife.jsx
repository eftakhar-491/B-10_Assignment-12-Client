import React from "react";
import { useTheme } from "../../Context/ThemeContext";

export default function CampusLife() {
  const { theme } = useTheme();
  return (
    <section className=" bg-maroon-700 bg-transparent text-black py-16 md:px-16 text-center">
      <h2
        className={`text-4xl font-bold ${theme ? "text-white" : "text-black"}`}
      >
        Campus <span className="">Life</span>
      </h2>
      <p
        className={`mt-4 text-lg max-w-2xl mx-auto ${
          theme ? "text-white" : "text-black"
        }`}
      >
        Building a vibrant community of creative and accomplished people from
        around the world
      </p>

      <div className="max-w-[1900px] mx-auto px-[5%] grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div className="relative group">
          <img
            src="https://www.edgewood.edu/wp-content/uploads/ViewBook155-1-1600x900.jpg"
            alt="Student Life"
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3
            className={`mt-4 text-xl font-semibold ${
              theme ? "text-white" : "text-black"
            }`}
          >
            Student Life
          </h3>
          <p className={`mt-2 text-sm ${theme ? "text-white" : "text-black"}`}>
            Experience the dynamic and engaging student activities on campus.
          </p>
        </div>
        <div className="relative group">
          <img
            src="https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/07/studentlife.webp"
            alt="Arts & Culture"
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3
            className={`mt-4 text-xl font-semibold ${
              theme ? "text-white" : "text-black"
            }`}
          >
            Arts & Culture
          </h3>
          <p className={`mt-2 text-sm ${theme ? "text-white" : "text-black"}`}>
            Immerse yourself in a diverse and vibrant artistic environment.
          </p>
        </div>
        <div className="relative group">
          <img
            src="https://www.hok.com/wp-content/uploads/2019/05/Auburn-University-Recreation-and-Wellness_InteriorEntry_1900.jpg"
            alt="Recreation & Wellness"
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3
            className={`mt-4 text-xl font-semibold ${
              theme ? "text-white" : "text-black"
            }`}
          >
            Campus Wellness
          </h3>
          <p className={`mt-2 text-sm ${theme ? "text-white" : "text-black"}`}>
            Experience Campus Wellness through our diverse programs that promote
            a balanced lifestyle.
          </p>
        </div>
        <div className="relative group">
          <img
            src="https://www.qu.edu/48e340/globalassets/global/media/qu/photography/5_student-life/1_undergrad/health-and-wellness/recreation-wellness/fitness-wellness-580x417-20221013-meditation-003.jpg"
            alt="Recreation & Wellness"
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3
            className={`mt-4 text-xl font-semibold ${
              theme ? "text-white" : "text-black"
            }`}
          >
            Recreation & Wellness
          </h3>
          <p className={`mt-2 text-sm ${theme ? "text-white" : "text-black"}`}>
            Stay active and maintain a balanced lifestyle with our wellness
            programs.
          </p>
        </div>
      </div>
    </section>
  );
}
