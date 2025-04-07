"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let newErrors: { [key: string]: string } = {};

    if (!/^[a-zA-Z0-9_]{8,16}$/.test(form.username)) {
      newErrors.username = "Username must be 8-16 characters (letters, numbers, underscores only)";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

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

    // Check if user is already registered
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some((user: any) => user.email === form.email);

    if (userExists) {
      alert("User already exists. Please log in.");
    } else {
      existingUsers.push(form);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Registration Successful! You can now log in.");
      window.location.href = "/login"; // Redirect to login page
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-2 border rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full p-2 border rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already registered? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </main>
  );
}
