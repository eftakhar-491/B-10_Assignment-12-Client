import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import profile from "../../assets/icon/profile.gif";
export default function Nav() {
  return (
    <>
      <nav className="font-Roboto">
        <div className="max-w-[1900px] lg:px-[5%] mx-auto flex items-center justify-between py-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
            <img src={logo} alt="logo" />
            <span className="font-Lora">ScholarSphere</span>
          </h1>
          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-4">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to={"/scholarships"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                }
              >
                <li>All Scholarship</li>
              </NavLink>
            </ul>
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "bg-blue-200" : "")}
              >
                <button className="active:scale-95 text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold">
                  LogIn
                </button>
              </NavLink>
              {/* <button className="text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-xl font-bold">
                Sign Up
              </button> */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={profile} alt="" />
                {/* <img src="" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
