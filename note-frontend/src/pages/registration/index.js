import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiLockKey } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CgUser } from "react-icons/cg";
import { BACKEND_URL } from "../../utils/urls";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState([]);

  const handleInputField = (e, type) => {
    const updatedField = { ...formData };
    updatedField[e.target.name] = e.target.value;
    setFormData(updatedField);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const hasError = validateField();

      if(!hasError) {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/registration`,
          data
        );
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
      <div className="w-[420px] min-h-[400px] bg-white lg:p-8 p-4 m-4 md:m-0 rounded-lg shadow-lg">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold text-slate-800">Registration</h1>
          <p className="text-sm text-slate-700 mt-1">Create an account</p>
        </div>

        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="mt-6 flex gap-4 flex-col"
        >
          <div>
            <label className="text-sm text-slate-700 capitalize font-medium text-base ml-1">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                onChange={(e) => handleInputField(e, "firstName")}
                placeholder="Enter your first name"
                className={`w-full border rounded-md pr-5 pl-10 py-[12px] bg-gray-100 mt-1 text-sm border-transparent focus:border-primary focus:outline-none py-2 ${getErrorMessage("firstName") ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <CgUser className="absolute top-[40%] -translate-x-1/2 left-[22px]" />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-700 capitalize font-medium text-base ml-1">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                onChange={(e) => handleInputField(e, "lastName")}
                placeholder="Enter your last name"
                className={`w-full border rounded-md pr-5 pl-10 py-[12px] bg-gray-100 mt-1 text-sm border-transparent focus:border-primary focus:outline-none py-2 ${getErrorMessage("lastName") ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <CgUser className="absolute top-[40%] -translate-x-1/2 left-[22px]" />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-700 capitalize font-medium text-base ml-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                onChange={(e) => handleInputField(e, "email")}
                placeholder="Enter your email"
                className={`w-full border rounded-md pr-5 pl-10 py-[12px] bg-gray-100 mt-1 text-sm border-transparent focus:border-primary focus:outline-none py-2 ${getErrorMessage("email") ? 'border-red-500 focus:border-red-500' : ''}`}
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
                onChange={(e) => handleInputField(e, "password")}
                placeholder="Enter your password"
                className={`w-full border rounded-md pr-5 pl-10 py-[12px] bg-gray-100 mt-1 text-sm border-transparent focus:border-primary focus:outline-none py-2 ${getErrorMessage("password") ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <PiLockKey className="absolute top-[40%] -translate-x-1/2 left-[22px]" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white rounded-md py-3 mt-4 font-medium text-sm focus:outline-none hover:bg-primary-dark active:scale-90 transition-all duration-300"
          >
            Registration
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-slate-700">
            Already have an account?{" "}
          </span>

          <Link to="/login" className="!text-primary font-medium ml-1 text-sm">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
