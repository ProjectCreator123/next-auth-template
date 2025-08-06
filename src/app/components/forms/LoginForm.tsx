"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginData>();
  const { login } = useAuth();

  const onSubmit = (data: LoginData) => {
    // replace with API call
    const fakeUser = { id: "1", name: "Rasliyath", email: data.email };
    login(fakeUser);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow w-80"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        {...register("email")}
        placeholder="Email"
        className="mb-2 p-2 w-full border rounded"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="mb-4 p-2 w-full border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
      <div className="mt-4 text-center space-y-2">
        <Link href="/register" className="text-blue-500 hover:underline block">
          Don’t have an account? Register
        </Link>
        <Link
          href="/forgot-password"
          className="text-blue-500 hover:underline block"
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}
