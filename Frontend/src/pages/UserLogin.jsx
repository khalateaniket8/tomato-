
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {

  const navigate = useNavigate()

  const submitHandler = async(e) => {
   e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const response = await axios.post("http://localhost:3000/api/auth/login", {
    email,
    password
  }, {
     withCredentials: true
  });

  toast.success("Login Successfully");

  navigate("/")

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6] px-4 py-10 text-gray-900 dark:bg-[#111111] dark:text-white">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1a1a] sm:p-10">
        <Link to="/" className="mb-10 inline-block text-2xl font-bold tracking-tight">
          Tomato<span className="text-orange-500">.</span>
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Sign in to discover your favourite food.
        </p>

        <form
        onSubmit={submitHandler}
        className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-orange-500 dark:border-white/15 dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-orange-500 dark:border-white/15 dark:placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Sign in
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/user/register" className="font-semibold text-orange-500">
            Create account
          </Link>
        </p>

        <div className="mt-6 border-t border-gray-100 pt-5 text-center text-sm dark:border-white/10">
          <span className="text-gray-500 dark:text-gray-400">Are you a food partner? </span>
          <Link to="/food-partner/login" className="font-medium hover:text-orange-500">
            Partner login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
