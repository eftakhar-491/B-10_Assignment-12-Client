import React, { useContext } from "react";
import goo from "../assets/icon/goo.png";
import { useNavigate } from "react-router-dom";
import logbg from "../assets/images/logbg.jpg";
import { AuthContext } from "../Firebase/AuthProvider";
import { toast } from "react-toastify";
export default function Login() {
  const navigate = useNavigate();
  const { signInWithGoogle, signIn } = useContext(AuthContext);
  function handelGoogleLogin() {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handelEmailPassLogin(e) {
    e.preventDefault();
    const email = e.target.floating_email.value;
    const password = e.target.floating_password.value;
    try {
      await signIn(email, password);
      toast.success("Login Success");
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <section className="my-16">
        <div
          style={{
            backgroundImage: `linear-gradient(
            to bottom,
            rgba(0,0,0,0),
            rgba(0,0,0,0)
          ),url(${logbg})`,
          }}
          className="max-w-[1900px] mx-auto px-[5%] bg-cover rounded-lg bg-center bg-no-repeat"
        >
          <form
            onSubmit={handelEmailPassLogin}
            className=" rounded-lg w-11/12 md:max-w-md lg:max-w-xl py-20"
          >
            <label className="text-2xl font-Lora font-bold">
              Log In to ScholarSphere
            </label>
            <div className="relative z-0 w-full mb-5 mt-3  group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <p className="text-sm text-right -mt-3 cursor-pointer">
              Forget Password
            </p>
            <button
              type="submit"
              className="w-full justify-center  active:scale-95 font-Roboto font-semibold hover:bg-blue-200 flex items-center gap-2 text-lg mt-5 border-2 border-blue-800 px-6 py-1 rounded-xl"
            >
              LogIn{" "}
            </button>
            <p className="text-center mt-4">-------- OR --------</p>
            <div
              onClick={handelGoogleLogin}
              className="w-full justify-center  active:scale-95 hover:bg-blue-200 border-blue-800 flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
            >
              <img className="w-6" src={goo} alt="" />
              Continue with Google
            </div>
            <p className="mt-4 text-center">
              --- Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="cursor-pointer "
              >
                Register
              </span>{" "}
              ---
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
