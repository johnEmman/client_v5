import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { signup as signupApi } from "../api/auth";
import GuestLogin from "./GuestLogin";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    try {
      const data = await signupApi(username, password);
      dispatch(signup({ username: data.user.username, isGuest: false }));
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Please try again.");
    }
  };
  const loading = useAuthRedirect("/mainpage");
  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-neutral-800 text-center">
            Sign Up
          </h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-neutral-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-neutral-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-neutral-600 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
            <GuestLogin />
            <a
              className="inline-block align-baseline font-bold text-sm text-neutral-600 hover:text-neutral-800"
              href="/auth/login"
            >
              Already have an account?
            </a>
          </div>
        </form>
        <p className="text-center text-neutral-500 text-xs">
          &copy;2024 Your Company Name. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
