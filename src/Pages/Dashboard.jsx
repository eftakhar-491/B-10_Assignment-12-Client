import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import dl from "../assets/images/DL.png";
import logo from "../assets/icon/logo.png";
import { AuthContext } from "../Firebase/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import StateContext from "../Context/StateContext";
const queryClient = new QueryClient();
export default function Dashboard() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === "/dashboard" ||
      location.pathname === "/dashboard/"
    ) {
      user?.userDB?.role === "User" && navigate("/dashboard/profile");
      user?.userDB?.role === "Moderator" && navigate("/dashboard/profile");
      user?.userDB?.role === "Admin" && navigate("/dashboard/admin-profile");
    }
  }, [location]);
  return (
    <>
      <ToastContainer />
      <main>
        <div className="relative max-w-[1900px] mx-auto flex">
          {/* left section  */}

          <section
            style={{
              backgroundImage: `linear-gradient(
                      to bottom,
                      rgba(0,0,0,.40),
                      rgba(0,0,0,.40)
                    ),url(${dl})`,
            }}
            className={`fixed ${
              sideBar ? "block md:block" : "hidden md:block"
            } z-40 w-[320px] overflow-y-auto text-white left-0 bg-cover bg-blue-900/80 h-screen`}
          >
            <div className="relative">
              <div
                onClick={() => setSideBar(false)}
                className="block md:hidden absolute -top-5 scale-125 cursor-pointer active:scale-110 right-5"
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
              </div>
              <img
                className=" bg-white rounded-full p-2 mx-auto mt-10"
                src={logo}
                alt="logo"
              />
              <h1 className="text-center text-3xl font-Lora py-4">
                ScholarSphere
              </h1>
            </div>
            <hr />
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "rounded-lg border-2 " : ""
              }
            >
              <li className="my-2 px-4 flex items-center text-xl font-Lora font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </li>
            </NavLink>
            <hr />
            <ul className="flex flex-col gap-2 mt-5 px-4">
              {user?.userDB?.role === "User" ||
              user?.userDB?.role === "Moderator" ? (
                <NavLink
                  to={"/dashboard/profile"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2 " : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    My Profile
                  </li>
                </NavLink>
              ) : (
                ""
              )}
              {user?.userDB?.role === "Admin" && (
                <>
                  {" "}
                  <NavLink
                    to={"/dashboard/admin-profile"}
                    className={({ isActive }) =>
                      isActive ? "rounded-lg border-2" : ""
                    }
                  >
                    <li className="flex items-center text-xl font-Lora font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      Admin Profile
                    </li>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/manage-users"}
                    className={({ isActive }) =>
                      isActive ? "rounded-lg border-2" : ""
                    }
                  >
                    <li className="flex items-center text-xl font-Lora font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                      </svg>
                      Manage Users
                    </li>
                  </NavLink>{" "}
                </>
              )}
              {user?.userDB?.role === "User" && (
                <NavLink
                  to={"/dashboard/applications"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2 " : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                      />
                    </svg>
                    My Application
                  </li>
                </NavLink>
              )}
              {user?.userDB?.role === "User" && (
                <NavLink
                  to={"/dashboard/reviews"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2" : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                    My reviews
                  </li>
                </NavLink>
              )}
              {user?.userDB?.role === "Moderator" ||
              user?.userDB?.role === "Admin" ? (
                <NavLink
                  to={"/dashboard/all-reviews"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2" : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>
                    All reviews
                  </li>
                </NavLink>
              ) : (
                ""
              )}
              {user?.userDB?.role === "Moderator" ||
              user?.userDB?.role === "Admin" ? (
                <NavLink
                  to={"/dashboard/add-scholarship"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2" : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                    Add Scholarship
                  </li>
                </NavLink>
              ) : (
                ""
              )}

              {user?.userDB?.role === "Moderator" ||
              user?.userDB?.role === "Admin" ? (
                <NavLink
                  to={"/dashboard/manage-scholarship"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2" : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                      />
                    </svg>
                    Manage Scholarships
                  </li>
                </NavLink>
              ) : (
                ""
              )}
              {user?.userDB?.role === "Moderator" ||
              user?.userDB?.role === "Admin" ? (
                <NavLink
                  to={"/dashboard/applied-scholarship"}
                  className={({ isActive }) =>
                    isActive ? "rounded-lg border-2" : ""
                  }
                >
                  <li className="flex items-center text-xl font-Lora font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                      />
                    </svg>
                    Applied Scholarships
                  </li>
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </section>

          {/* right section */}
          <section className="relative h-screen w-full overflow-y-auto">
            <StateContext.Provider value={{ setSideBar }}>
              <QueryClientProvider client={queryClient}>
                <Outlet />
              </QueryClientProvider>
            </StateContext.Provider>
          </section>
        </div>
      </main>
    </>
  );
}
