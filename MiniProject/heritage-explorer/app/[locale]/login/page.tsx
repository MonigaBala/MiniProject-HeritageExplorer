"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Get registered users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const user = existingUsers.find((user: any) => user.email === form.email);

    if (!user) {
      alert("You must register before logging in.");
    } else if (user.password !== form.password) {
      alert("Incorrect password. Try again.");
    } else {
      alert("Login Successful!");
      window.location.href = "/home"; // Redirect to home page
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          New user? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </div>
    </main>
  );
}
