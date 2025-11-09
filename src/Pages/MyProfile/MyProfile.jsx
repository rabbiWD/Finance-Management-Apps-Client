import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">   
        <h2 className="text-center font-bold text-2xl pt-5">My Profile</h2>
        <div className=" flex items-center justify-center py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-sm p-8 border border-gray-100 flex flex-col items-center space-y-4">
        <img
          className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200"
          src={user?.photoURL}
          alt="profile"
        />
        <h2 className="text-xl font-bold text-indigo-600 text-center">
          {user?.displayName}
        </h2>
        <p className="text-gray-500 text-center">{user?.email}</p>
        <button
          onClick={() => navigate("/update-profile")}
          className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none mt-4"
        >
          Update Profile
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default MyProfile;
