import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#cfd9ff] via-[#e6e9ff] to-[#f3f6ff] 
    // dark:from-[#1a1c2c] dark:via-[#2b2e44] dark:to-[#3d4060] 
    // transition-all duration-700 ease-in-out">   
    //     <h2 className="text-center font-bold text-2xl pt-5">My Profile</h2>
    //     {/* <div className=" flex items-center justify-center py-10"> */}
    //   <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm p-8 border border-gray-100 flex flex-col items-center space-y-4">
    //     <img
    //       className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200"
    //       src={user?.photoURL}
    //       alt="profile"
    //     />
    //     <h2 className="text-xl font-bold text-indigo-600 text-center">
    //       {user?.displayName}
    //     </h2>
    //     <p className="text-gray-500 text-center">{user?.email}</p>
    //     <button
    //       onClick={() => navigate("/update-profile")}
    //       className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none mt-4"
    //     >
    //       Update Profile
    //     </button>
    //   </div>
    // </div>
    // // </div>

     <div className="min-h-screen flex flex-col items-center justify-center 
    bg-gradient-to-br from-[#cfd9ff] via-[#e6e9ff] to-[#f3f6ff] 
    dark:from-[#1a1c2c] dark:via-[#2b2e44] dark:to-[#3d4060] 
    transition-all duration-700 ease-in-out">
      
      <h2 className="text-center font-bold text-3xl mb-8 
      text-indigo-700 dark:text-indigo-300 drop-shadow-sm">
        My Profile
      </h2>

      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md 
      shadow-2xl rounded-3xl w-full max-w-sm p-8 border border-indigo-100 
      dark:border-indigo-700 flex flex-col items-center space-y-4 transition-all duration-500">
        
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 dark:border-indigo-500 shadow-md"
          src={user?.photoURL}
          alt="profile"
        />

        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 text-center">
          {user?.displayName}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-center">
          {user?.email}
        </p>

        <button
          onClick={() => navigate("/update-profile")}
          className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none mt-4 transition-transform duration-300 hover:scale-105"
        >
          Update Profile
        </button>
      </div>
    </div>
    


  );
};

export default MyProfile;
