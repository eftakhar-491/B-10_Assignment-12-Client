import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import { useTheme } from "../../Context/ThemeContext";
export default function Footer() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <>
      <footer
        className={`${theme ? "bg-transparent" : "bg-white"} py-20 mt-24`}
      >
        <div className=" flex flex-col md:flex-row justify-between px-[5%] max-w-[1900px] mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
              <img className="hidden md:block" src={logo} alt="logo" />

              <span className="font-Lora text-2xl font-semibold">
                ScholarSphere
              </span>
            </h1>
            <div>
              <h1 className="text-xl font-Lora mt-3">Contact Us</h1>
              <p>Uttora-10, Dhaka - Bangladesh</p>
              <p>01539-995020 , 01711-569569</p>
              <p>contact@ScholarSphere.com</p>
            </div>
            <div className="flex gap-2 mt-5">
              <img
                onClick={() => navigate("www.facebook.com")}
                className=" w-10 rounded-full h-10 text-[10px]"
                src="https://static.xx.fbcdn.net/rsrc.php/v4/yK/r/BHkEd6znUYJ.png"
                alt="facebook"
              />
              <img
                onClick={() => navigate("www.Youtube.com")}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_L4BWDRzfzlwM3wQTJ0qFXOkcIqdl0RnuVQ&s"
                alt="youtube"
                className="border w-10  bg-gray-100 rounded-full h-10 text-[10px]"
              />
              <img
                onClick={() => navigate("www.linkdin.com")}
                src="https://media.licdn.com/dms/image/v2/D4D12AQFSkkazpND0Tg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696901179396?e=2147483647&v=beta&t=sg_aDp3g51FrQdFdKqc_c7Lz249Igbl5buOJvCcRzEY"
                alt="Linkdin"
                className="p-1 border bg-gray-100 w-10 rounded-full h-10 text-[10px]"
              />
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-Lora">Quick Links</h1>
            <ul className="mt-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/scholarships">All Scholarship</Link>
              </li>

              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-Lora">Newsletter</h1>
            <p className="mt-3 text-sm">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <div className="mt-3 flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border min-w-[300px] rounded-md w-full md:w-auto"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
