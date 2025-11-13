import React, { use, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

// const Login = () => {
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const emailRef = useRef()
//   const { signIn, signInWithGoogle } = use(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   console.log(location);
//   // const from = location.state ? location.state : '/';

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     // console.log({email, password});

//     signIn(email, password)
//       .then((result) => {
//         const user = result.user;
//         console.log(user);

//         toast.success("Login successfully");
//         // navigate(from, {replace: true});
//         navigate(`${location.state ? location.state : "/"}`);
//       })
//       .catch((error) => {
//         // toast.error(error.message || 'Login failed')
//         const errorCode = error.code;
//         // const errorMessage = error.message;
//         // alert(errorCode, errorMessage)
//         setError(errorCode);
//       });
//   };

//   const handleGoogleLogin = ()=>{
//       signInWithGoogle()
//       .then(result=>{
//          console.log(result.user);
//          toast.success("Login Successfully with Google")
//          navigate(location?.state || '/')
//          // toast use
//       })
//       .catch(error=>{
//          console.log(error);
//       })
//   }

// //     const handleForgetPassword = () => {
// //     const email = emailRef.current?.value || "";
// //     navigate("/forgetPassword", { state: { email } });
// //   };

//   return (
//     <div className="flex justify-center min-h-screen items-center bg-gradient-to-b from-indigo-50 to-white">
//       <div className="card bg-white w-full max-w-sm shadow-xl border border-gray-100 rounded-2xl">
//         <h2 className="text-2xl font-bold text-center py-5 text-secondary">
//           Login your account
//         </h2>

//         <form onSubmit={handleLogin} className="card-body">
//           <fieldset className="fieldset space-y-3">
//             {/* email */}
//             <label className="label">Email</label>
//             <div>
//                <input
//               name="email"
//               type="email"
//               className="input w-full "
//               ref={emailRef}
//               placeholder="Enter your email"
//               required
//             />
//             </div>
//             {/* password with toggle */}
//             <div className="relative">
//             <label className="label">Password</label>
//             <input
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               className="input w-full"
//               placeholder="Enter your password"
//               required
//             />

//             {/* eye button */}
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-7 text-gray-500 hover:text-indigo-600">
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {error && <p className="text-red-400 text-sm">{error}</p>}
//             <div>
//               {/* <a onClick={()=>navigate('/forgetPassword')} className="link link-hover text-sm text-indigo-600 cursor-pointer">Forgot password?</a> */}
//               <span className="link link-hover text-sm text-indigo-600 cursor-pointer">Forgot Password</span>
//             </div>

//             <button type="submit" className="btn btn-neutral mt-4 w-full" >
//               Login
//             </button>
//           </fieldset>
//         </form>
//             <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mx-auto w-[335px]">
//               <svg
//                 aria-label="Google logo"
//                 width="16"
//                 height="16"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 512 512"
//               >
//                 <g>
//                   <path d="m0 0H512V512H0" fill="#fff"></path>
//                   <path
//                     fill="#34a853"
//                     d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
//                   ></path>
//                   <path
//                     fill="#4285f4"
//                     d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
//                   ></path>
//                   <path
//                     fill="#fbbc02"
//                     d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
//                   ></path>
//                   <path
//                     fill="#ea4335"
//                     d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
//                   ></path>
//                 </g>
//               </svg>
//               Login with Google
//             </button>

//             <p className="font-semibold text-center text-[12px] pb-3 mt-2">
//               Don't have an Account?{" "}
//               <Link
//                 className="text-blue-400 hover:text-blue-500 underline"
//                 to="/auth/register"
//               >
//                 Register
//               </Link>
//             </p>
//       </div>

//     </div>
//   );
// };

// export default Login;

// import React, { use, useState } from "react";
// import { AuthContext } from "../../Context/AuthContext";
// import { Link, useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import { Eye, EyeOff } from "lucide-react";
// import { FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";

const Login = () => {
  const { signIn, signInWithGoogle, setUser } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
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
