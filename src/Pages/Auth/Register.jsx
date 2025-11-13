import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, setUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must include at least one lowercase letter");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registered Successfully!");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then(() => {
        toast.success("User created successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-md w-full max-w-md shadow-2xl rounded-3xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Your name"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Your Photo url"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label text-gray-700 dark:text-gray-300">Email</label>
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
            <label className="label text-gray-700 dark:text-gray-300">Password</label>
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
              className="absolute right-3 top-10 text-gray-500 hover:text-emerald-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Animated Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Register
          </motion.button>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <FaGoogle className="text-red-500" /> Sign in with Google
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-5">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;

