import React, { use, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//     const {signInUser, signInWithGoogle} = use(AuthContext);
//     // const {signInUser, signInWithGoogle} = useContext(AuthContext);

//     const location = useLocation();
//     const navigate = useNavigate();
//     console.log(location);

//      const handleLogIn = (e) =>{
//         e.preventDefault();
//         const email = e.target.email.value;
//         const password = e.target.password.value;
//         console.log(email, password);

//         signInUser(email, password)
//         .then((result)=>{
//             console.log(result.user);
//             e.target.reset();
//             navigate(location.state || '/');
//         })
//          .catch((error) => {
//          console.log(error);
//       });
//     }

//     const handleGoogleSignIn = ()=>{
//         signInWithGoogle()
//         .then((result)=>{
//             console.log(result.user);
//             navigate(location?.state || '/')
//         })
//          .catch((error)=>{
//             console.log(error);
//          })
//     }

//   return (
//     <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
//       <div className="card-body">
//         <h1 className="text-3xl font-bold text-center">Login</h1>
//         <form onSubmit={handleLogIn}>
//           <fieldset className="fieldset">
//             <label className="label">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="input rounded-full focus:border-0 focus:outline-gray-200"
//               placeholder="Email"
//             />

//             <label className="label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="input rounded-full focus:border-0 focus:outline-gray-200"
//               placeholder="Password"
//             />
//             <div>
//               <a className="link link-hover">Forgot password?</a>
//             </div>
//             <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
//               Login
//             </button>
//           </fieldset>
//         </form>

//         <button
//           onClick={handleGoogleSignIn}
//           className="btn bg-white rounded-full text-black border-[#e5e5e5]"
//         >
//           <FaGoogle />
//           Login with Google
//         </button>
//         <p className="text-center">
//           New to our website? Please{" "}
//           <Link
//             className="text-blue-500 hover:text-blue-800"
//             to="/auth/register"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };


const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef()
  const { signIn, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  // const from = location.state ? location.state : '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({email, password});

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        toast.success("Login successfully");
        // navigate(from, {replace: true});
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        // toast.error(error.message || 'Login failed')
        const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(errorCode, errorMessage)
        setError(errorCode);
      });
  };

  const handleGoogleLogin = ()=>{
      signInWithGoogle()
      .then(result=>{
         console.log(result.user);
         toast.success("Login Successfully with Google")
         navigate(location?.state || '/')
         // toast use
      })
      .catch(error=>{
         console.log(error);
      })
  }

//     const handleForgetPassword = () => {
//     const email = emailRef.current?.value || ""; 
//     navigate("/forgetPassword", { state: { email } }); 
//   };


  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="card bg-white w-full max-w-sm shadow-xl border border-gray-100 rounded-2xl">
        <h2 className="text-2xl font-bold text-center py-5 text-secondary">
          Login your account
        </h2>

        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset space-y-3">
            {/* email */}
            <label className="label">Email</label>
            <div>
               <input
              name="email"
              type="email"
              className="input w-full "
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
            </div>
            {/* password with toggle */}
            <div className="relative">
            <label className="label">Password</label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input w-full"
              placeholder="Enter your password"
              required
            />

            {/* eye button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-7 text-gray-500 hover:text-indigo-600">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div>
              {/* <a onClick={()=>navigate('/forgetPassword')} className="link link-hover text-sm text-indigo-600 cursor-pointer">Forgot password?</a> */}
              <span className="link link-hover text-sm text-indigo-600 cursor-pointer">Forgot Password</span>
            </div>

            <button type="submit" className="btn btn-neutral mt-4 w-full" >
              Login
            </button>
          </fieldset>
        </form>
            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mx-auto w-[335px]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          
            <p className="font-semibold text-center text-[12px] pb-3 mt-2">
              Don't have an Account?{" "}
              <Link
                className="text-blue-400 hover:text-blue-500 underline"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
      </div>
      
    </div>
  );
};

export default Login;


