import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout.jsx";

import TextField from "./TextField.jsx";
import toast from "react-hot-toast";
import api from "../api/api.js";

function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: response } = await api.post(
        "/api/auth/public/register",
        data,
      );

      reset();
      toast.success("Successfully registered!");
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("Registration failed");
    }
  };

  return (
    <AuthLayout
      title="Join NanoUrl"
      subtitle="Create a free account to save links and access your dashboard."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <TextField
          label="Username"
          id="username"
          type="text"
          placeholder="johndoe"
          register={register}
          errors={errors}
          required
          message="Username is required"
          className="text-slate-300"
          inputClassName="text-slate-100 border-white/15 bg-slate-950/80 placeholder:text-slate-500"
        />

        <TextField
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          errors={errors}
          required
          message="Email is required"
          className="text-slate-300"
          inputClassName="text-slate-100 border-white/15 bg-slate-950/80 placeholder:text-slate-500"
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          placeholder="At least 6 characters"
          register={register}
          errors={errors}
          required
          message="Password is required"
          min={6}
          className="text-slate-300"
          inputClassName="text-slate-100 border-white/15 bg-slate-950/80 placeholder:text-slate-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
