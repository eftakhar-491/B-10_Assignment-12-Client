import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import profile from "../../assets/icon/profile.gif";
export default function Nav() {
  return (
    <>
      <nav className="font-Roboto bg-white z-50 backdrop-blur-md fixed top-0 w-full">
        <div className="relative max-w-[1900px] px-4 md:px-[5%] mx-auto flex items-center justify-between py-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
            <img className="hidden md:block" src={logo} alt="logo" />
            <span className="cursor-pointer active:scale-95 md:hidden">
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </span>
            <span className="font-Lora text-[16px] md:text-xl">
              ScholarSphere
            </span>
          </h1>
          {/* mobile menu list */}

          <ul className="flex md:hidden flex-col absolute top-12 bg-blue-400/60 backdrop-blur-md p-4 rounded-lg z-50 gap-4">
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
            <ul className="md:flex hidden items-center gap-4">
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
                <button className="active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 hover:bg-blue-100 py-1 rounded-lg font-bold">
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
