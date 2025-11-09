import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(e.target);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, photo, email, password);

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
        // console.log(user);
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Register Successfully!");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error(error.message);
      });
  };

   const handleGoogleSignIn = ()=>{
        toast.loading('creating user...', {id: 'create-user'});
        signInWithGoogle()
        .then((result)=>{
            toast.success('User created successfully!', {id: 'create-user'});
            console.log(result.user);
            navigate('/')
        })
        .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
    }

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="card bg-white w-full max-w-sm shadow-xl border border-gray-100 rounded-2xl">
        <h2 className="text-2xl font-semibold text-center py-4 text-indigo-600">
          SignUp your account
        </h2>

        <form onSubmit={handleSignUp} className="card-body">
          <fieldset className="fieldset space-y-3">
            {/* name */}
            <div>
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input w-full"
                placeholder="Your Name"
                required
              />
            </div>
            {/* photoUrl */}
            <div>
              <label className="label">Photo URL</label>
              <input
                name="photo"
                type="text"
                className="input w-full"
                placeholder="photo URL"
                required
              />
            </div>
            {/* email */}
            <div>
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full"
                placeholder="Your email"
                required
              />
            </div>
            {/* password with toggle */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input w-full"
                placeholder="Password"
                required
              />

              {/* Toggle eye button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-7 text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn btn-neutral mt-3 w-full">
              Register
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white rounded-full text-black border-[#e5e5e5]"
            >
              <FaGoogle />
              Login with Google
            </button>

            <p className="font-semibold text-center pt-5">
              Already have an Account?{" "}
              <Link
                className="text-blue-400 hover:text-blue-600 underline"
                to="/auth/login"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
