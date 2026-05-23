import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "./AuthLayout.jsx";

import TextField from "./TextField.jsx";

import toast from "react-hot-toast";
import api from "../api/api.js";
import { useStoreContext } from "../contextApi/ContextApi.jsx";

function LoginPage() {
  const navigate = useNavigate();

   const { setToken } = useStoreContext();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: response } = await api.post(
        "/api/auth/public/login",
        data,
      );      

      reset();

      console.log(response.token);
      setToken(response.token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));

      
      toast.success("Successfully logged in !");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Login failed");
    }
  };

  return (
    <AuthLayout
      title="Sign in to NanoUrl"
      subtitle="Sign in to manage your short links and track clicks."
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
          placeholder="Enter your username"
          register={register}
          errors={errors}
          required
          message="Username is required"
          className="text-slate-300"
          inputClassName="text-slate-100 border-white/15 bg-slate-950/80 placeholder:text-slate-500"
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
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
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
