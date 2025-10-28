import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithGoogle } from "../lib/googleSSO";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-20 px-8"
      style={{
        background: "linear-gradient(135deg, #004B59 10%, #001F3F 100%)",
      }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Login to your account
      </h2>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-grey-700">
              Company Email
            </label>
            <input
              placeholder="Email"
              type="email"
              required
              className="mt-2 block w-full rounded-[5px] border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full rounded-[5px] border border-slate-200 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-800">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="#" className="text-blue-700">
              Forgot password?
            </Link>
          </div>

          <div>
            <button className="w-full cursor-pointer bg-[#2F80ED] hover:bg-[#1f6fe0] text-white py-3 rounded-full text-lg font-medium">
              Login
            </button>
          </div>

          <p className="text-center text-sm text-slate-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700">
              Sign Up
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-slate-200" />
            <span className="text-sm text-slate-400">Or continue with</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const res = await signInWithGoogle();
                  console.log("Google sign-in", res);
                  // TODO: exchange token with your backend or store session
                  navigate("/");
                } catch (err) {
                  console.error(err);
                  alert(
                    "Google sign-in failed: " +
                      (err && err.message ? err.message : err)
                  );
                }
              }}
              className="w-full border border-slate-200 rounded-md py-2 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.9 0 6.6 1.7 8.1 3.1l6-5.8C35.4 3.6 30.2 1 24 1 14.7 1 6.9 6.6 3 14.4l7.3 5.6C12.8 15 18 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h12.6c-.5 2.8-2.1 5.2-4.6 6.8l7.3 5.7c4.3-4 6.8-9.9 6.8-16.6z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.3 29.9c-.8-2.3-1.3-4.8-1.3-7.4 0-2.6.5-5.1 1.3-7.4L3 9.5C1 13.6 0 18.7 0 24s1 10.4 3 14.5l7.3-5.6z"
                />
                <path
                  fill="#34A853"
                  d="M24 46.5c6.2 0 11.4-2.1 15.2-5.7l-7.3-5.7c-2.1 1.4-4.8 2.3-7.9 2.3-6 0-11.1-4.9-12.2-11.3l-7.3 5.6C6.9 41.9 14.7 46.5 24 46.5z"
                />
              </svg>
              <span>Continue With Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
