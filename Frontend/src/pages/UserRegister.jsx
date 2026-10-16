import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

const UserRegister = () => {

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault();

      const fullName = e.target.fullName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

     const response = await axios.post("http://localhost:3000/api/auth/register", {
        fullName,
        email,
        password
     }, {
      withCredentials: true
     });

     toast.success("User Registeration successfully");

     navigate('/user/login')

    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6] px-4 py-10 text-gray-900 dark:bg-[#111111] dark:text-white">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#1a1a1a] sm:p-10">
        <Link to="/" className="mb-8 inline-block text-2xl font-bold tracking-tight">
          Tomato<span className="text-orange-500">.</span>
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join us and make every meal special.
        </p>

        <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">fullName</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your full name"
              className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-orange-500 dark:border-white/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-orange-500 dark:border-white/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none focus:border-orange-500 dark:border-white/15"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/user/login" className="font-semibold text-orange-500">
            Sign in
          </Link>
        </p>

        <div className="mt-5 border-t border-gray-100 pt-5 text-center text-sm dark:border-white/10">
          <span className="text-gray-500 dark:text-gray-400">Want to list your food? </span>
          <Link to="/food-partner/register" className="font-medium hover:text-orange-500">
            Become a partner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
