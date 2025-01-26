// pages/login.js

import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>

        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
