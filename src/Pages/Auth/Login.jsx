import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { signIn, signInWithGoogle, setUser } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  // const from = location.state ? location.state : '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in...", { id: "login" });
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in successfully!", { id: "login" });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "login" });
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-md w-full max-w-md shadow-2xl rounded-3xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-sky-600 dark:text-sky-400 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-sky-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
           
            <span className="link link-hover text-sm text-indigo-600 cursor-pointer">
              Forgot Password
            </span>
           
          </div>

          {/* Animated Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Login
          </motion.button>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-sky-600 hover:underline dark:text-sky-400"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
