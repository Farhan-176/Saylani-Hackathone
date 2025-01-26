import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Display success message
      } else {
        setError(data.error); // Display error message
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h1>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-600 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
