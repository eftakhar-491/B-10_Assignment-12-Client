import React, { useContext, useState } from "react";
import goo from "../assets/icon/goo.png";
import { useNavigate } from "react-router-dom";
import logbgr from "../assets/images/logbgr.jpg";
import { AuthContext } from "../Firebase/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
export default function Register() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageuploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const { signInWithGoogle, createUser, updateUserProfile } =
    useContext(AuthContext);
  async function handelGoogleLogin() {
    try {
      await signInWithGoogle();
      toast.success("Login Success");
    } catch (err) {
      console.log(err);
    }
  }
  async function handelPhotoUpload(e) {
    e.preventDefault();
    setImageUploading(true);
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgbb_API_KEY
      }`,
      formdata
    );
    console.log(data.data.display_url);
    setImageUrl(data.data.display_url);
    setImageUploading(false);
  }
  function validatePassword(password) {
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  async function handelEmailPassLogin(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.floating_email.value;
    const password = e.target.floating_password.value;
    if (!imageUrl) {
      return toast("Please Wait Image is Uploading");
    }
    if (!validatePassword(password)) {
      return toast.warning(
        "Password must contain 6 charecter long, 1 special character and 1 Capital letter"
      );
    }
    try {
      await createUser(email, password);
      await updateUserProfile(name, imageUrl);
      await axios.put(`${import.meta.env.VITE_APIURL}/users`, {
        email,
        name,
        imageUrl,
      });
      toast.success("Account Created Successfully");
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
            ),url(${logbgr})`,
          }}
          className="max-w-[1900px] mx-auto px-[5%] bg-cover rounded-lg bg-center bg-no-repeat"
        >
          <form
            onSubmit={handelEmailPassLogin}
            className="mx-auto sm:mx-0 sm:ml-auto rounded-lg w-11/12 md:max-w-md lg:max-w-xl py-20"
          >
            <label className="text-2xl font-Lora font-bold">
              Create an Account
            </label>
            <div className="relative z-0 w-full mb-5 mt-3  group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 mt-3  group">
              <input
                required
                type="file"
                name="photo"
                id="photo"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handelPhotoUpload}
              />
              <label
                htmlFor="photo"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Select Profile Picture
              </label>
            </div>
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

            <button
              type="submit"
              className="w-full justify-center  active:scale-95 font-Roboto font-semibold hover:bg-blue-200 flex items-center gap-2 text-lg mt-5 border-2 border-blue-800 px-6 py-1 rounded-xl"
            >
              Create An Account{" "}
            </button>
            <p className="text-center mt-4">-------- OR --------</p>
            <button
              onClick={handelGoogleLogin}
              className="w-full justify-center  active:scale-95 hover:bg-blue-200 border-blue-800 flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
            >
              <img className="w-6" src={goo} alt="" />
              Continue with Google
            </button>
            <p className="mt-4 text-center">
              --- Have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="cursor-pointer underline"
              >
                LogIn
              </span>{" "}
              ---
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
