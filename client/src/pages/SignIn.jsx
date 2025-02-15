import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice.js";
import Oauth from "../Components/Oauth.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleFormValidation = (e) => {
    e.preventDefault();
    const formErrors = {};

    if (!formData.email) {
      formErrors.email = "Please Enter a valid Email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email format is invalid.";
    }

    if (!formData.password) {
      formErrors.password = "A password is required.";
    }

    if (Object.keys(formErrors).length === 0) {
      handleSubmit();
    } else {
      setErrors(formErrors);
    }
  };

  const handleSubmit = () => {
    console.log(formData)
    dispatch(signInStart());
    axios
      .post('http://localhost:5555/auth/sign-in', formData)
      .then((res) => {
        console.log("success");
        dispatch(signInSuccess(res));
        navigate("/");
      })
      .catch((err) => {
        console.log("errr")
        setErrors({ userInvalid: "Invalid User credentials!" });
        dispatch(signInFailure(err.message));
      });
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In
        </h1>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  required
                  onChange={handleChange}
                  className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  required
                  onChange={handleChange}
                  className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              {errors.userInvalid && (
                <p className="text-red-500">{errors.userInvalid}</p>
              )}
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-[50px]"
                onClick={handleFormValidation}
                disabled={loading}
              >
                Sign In
              </button>
              <Oauth />
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Do not have an account?
            <Link
              to={"/sign-up"}
              className="font-semibold leading-6 text-red-600 hover:text-red-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
