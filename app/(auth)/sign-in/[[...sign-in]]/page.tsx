"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInAction } from "@/app/actions/sign-in"; // Adjust path as needed
import { IUser } from "@/types";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>();

  const handleLogin = async (data: IUser) => {
    const success = await signInAction(data);
    if (success) {
      router.push("/dashboard"); // Change to your authenticated route
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-zinc-800">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="you@example.com"
              className="w-full text-zinc-800 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-zinc-800">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="********"
              className="w-full text-zinc-800 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-600 text-white py-2 rounded hover:bg-zinc-600/90 transition-colors duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
