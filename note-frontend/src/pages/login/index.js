import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import { PiLockKey } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState([]);
  const navigate = useNavigate();

  const handleInputField = (e, type) => {
    const updatedField = { ...formData };
    updatedField[e.target.name] = e.target.value;
    setFormData(updatedField);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const hasError = validateField();

      if (!hasError) {
        const response = await axios.post(`${BACKEND_URL}/api/v1/login`, data, {
          withCredentials: true,
          credentials: "include",
        });

        if (response.data) {
          navigate("/dashboard/notes");
          // Cookies.set("auth_user", JSON.stringify(Cookies.get("auth_user")));
          // Cookies.set("access_token", Cookies.get("access_token"));
          localStorage.setItem(
            "access_token",
            JSON.stringify(Cookies.get("access_token"))
          );
          localStorage.setItem(
            "auth_user",
            JSON.stringify(Cookies.get("auth_user"))
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateField = () => {
    const errors = [];
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        errors.push(key);
        return;
      }
    });

    setFieldErrors(errors);
    return errors.length > 0 ? true : false;
  };

  const getErrorMessage = (field) => {
    if (fieldErrors.includes(field)) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-screen h-screen  bg-gradient-to-r from-primary to-sky-400 flex items-center justify-center">
      {/* <img src={'/images/auth_bg_3.jpg'} alt="bg" className="absolute top-0 left-0 w-full h-full" /> */}
      <div className="w-[420px] min-h-[400px] bg-white lg:p-8 p-4 m-4 md:m-0 rounded-lg shadow-lg">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold text-slate-800">Login</h1>
          <p className="text-sm text-slate-700 mt-1">Login to your account</p>
        </div>

        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="mt-6 flex gap-4 flex-col"
        >
          <div>
            <label className="text-sm text-slate-700 capitalize font-medium text-base ml-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => handleInputField(e, "email")}
                className={`w-full border rounded-md pr-5 pl-10 py-[12px] bg-gray-100 mt-1 text-sm border-transparent focus:border-primary focus:outline-none py-2 ${
                  getErrorMessage("email")
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
              />
              <MdOutlineMailOutline className="absolute top-[40%] -translate-x-1/2 left-[22px]" />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-700 capitalize font-medium text-base ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => handleInputField(e, "password")}
                className={`w-full border rounded-md pr-5 pl-10 py-[12px] bg-gray-100 mt-1 text-sm border-transparent focus:border-primary focus:outline-none py-2 ${
                  getErrorMessage("password")
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
              />
              <PiLockKey className="absolute top-[40%] -translate-x-1/2 left-[22px]" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-primary focus:outline-none"
              />
              <span className="text-sm text-slate-700 ml-2">Remember me</span>
            </div>
            <a href="#" className="text-sm text-primary font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-primary text-white rounded-md py-3 mt-4 font-medium text-sm focus:outline-none hover:bg-primary-dark active:scale-90 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-slate-700">
            Don't have an account?{" "}
          </span>

          <Link
            to="/registration"
            className="!text-primary font-medium ml-1 text-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
