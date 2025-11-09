import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile({ displayName: name, photoURL })
      .then(() => {
        toast.success("Profile Updated Successfully");
        navigate("/my-profile");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6 ">
          Update Profile Info
        </h2>

        <form onSubmit={handleUpdate} className="card-body space-y-3">
          <fieldset className="fieldset">
            <div>
              <label className="label block mb-1 text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full border border-gray-300 rounded-lg p-2 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="label block mb-1 text-gray-700">Photo</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input w-full border border-gray-300 rounded-lg p-2 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Your Photo URL"
              />
            </div>
            <button
              type="submit"
              className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-all duration-200 mt-4"
            >
              Save Changes
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
