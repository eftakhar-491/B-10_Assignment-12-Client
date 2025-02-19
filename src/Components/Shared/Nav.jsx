import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import profile from "../../assets/icon/profile.gif";
import { AuthContext } from "../../Firebase/AuthProvider";
import { toast } from "react-toastify";
import { useTheme } from "../../Context/ThemeContext";
export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const { logOut, user } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  async function handelLogout() {
    try {
      await logOut();
      toast.success("Logout Success");
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  console.log(theme);
  return (
    <>
      <nav
        className={`font-Roboto z-50 backdrop-blur-md fixed top-0 w-full ${
          theme ? "bg-black" : "bg-white"
        }`}
      >
        <div className="relative max-w-[1900px] px-4 md:px-[5%] mx-auto flex items-center justify-between py-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl flex items-center gap-2">
            {!theme && (
              <img className="hidden md:block" src={logo} alt="logo" />
            )}
            <span
              onClick={() => setMenu((p) => !p)}
              className="cursor-pointer active:scale-95 lg:hidden"
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </span>
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer font-Lora text-[16px] md:text-xl"
            >
              ScholarSphere
            </span>
          </h1>
          {/* mobile menu list */}

          {menu && (
            <ul
              className={`flex lg:hidden flex-col absolute top-12 bg-blue-400/60 backdrop-blur-md p-4 rounded-lg z-50 gap-4`}
            >
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
              <NavLink
                to={"/aboutus"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                }
              >
                <li>About Us</li>
              </NavLink>
              {user && (
                <NavLink
                  state={{ his: "/dashboard" }}
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                  }
                >
                  <li>Dashboard</li>
                </NavLink>
              )}
              {user && (
                <NavLink
                  state={{ his: "/contactus" }}
                  to={"/contactus"}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                  }
                >
                  <li>Contact Us</li>
                </NavLink>
              )}
            </ul>
          )}

          <div className="flex items-center gap-4">
            <ul className="lg:flex hidden items-center gap-4">
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
              <NavLink
                to={"/aboutus"}
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                }
              >
                <li>About Us</li>
              </NavLink>
              {user && (
                <NavLink
                  state={{ his: "/dashboard" }}
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                  }
                >
                  <li>Dashboard</li>
                </NavLink>
              )}
              {user && (
                <NavLink
                  state={{ his: "/contactus" }}
                  to={"/contactus"}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-blue-800 font-semibold" : ""
                  }
                >
                  <li>Contact Us</li>
                </NavLink>
              )}
            </ul>
            <div className="flex items-center gap-4">
              {!user ? (
                location.pathname === "/login" ? (
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "bg-blue-200" : ""
                    }
                  >
                    <button
                      className={`active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 ${
                        theme ? "hover:bg-slate-900" : "hover:bg-blue-100"
                      } py-1 rounded-lg font-bold `}
                    >
                      Register
                    </button>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "bg-blue-200" : ""
                    }
                  >
                    <button
                      className={`"active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 ${
                        theme ? "hover:bg-slate-900" : "hover:bg-blue-100"
                      } py-1 rounded-lg font-bold `}
                    >
                      LogIn
                    </button>
                  </NavLink>
                )
              ) : (
                <>
                  <button
                    onClick={handelLogout}
                    className={`active:scale-95 text-sm md:text-lg border-2 border-blue-800 px-5 ${
                      theme ? "hover:bg-slate-900" : "hover:bg-blue-100"
                    } py-1 rounded-lg font-bold `}
                  >
                    LogOut
                  </button>
                </>
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center md:w-10 md:h-10 w-6 h-6 rounded-full border-2 "
                  aria-label="Toggle light and dark mode"
                >
                  {!theme ? (
                    <span className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 md:size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 md:size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                      </svg>
                    </span>
                  )}
                </button>
                <div
                  onClick={() => setProfileMenu((p) => !p)}
                  className="cursor-pointer active:scale-95 border md:w-10 md:h-10 w-6 h-6 rounded-full overflow-hidden"
                >
                  {user ? (
                    <img src={user?.photoURL} alt="" />
                  ) : (
                    <img className="bg-white" src={profile} alt="" />
                  )}
                </div>
              </div>

              {profileMenu && (
                <ul
                  className={`right-3 flex md:hidden flex-col absolute top-14 bg-blue-400/60 backdrop-blur-md p-4 rounded-lg z-50 gap-4`}
                >
                  {user && (
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "border-b-2 border-blue-800 font-semibold"
                          : ""
                      }
                    >
                      <li>Dashboard</li>
                    </NavLink>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
