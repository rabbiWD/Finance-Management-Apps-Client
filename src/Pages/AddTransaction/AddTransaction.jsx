// import React, { use, useState } from "react";
// import { AuthContext } from "../../Context/AuthContext";
// import toast from "react-hot-toast";
// import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

// const AddTransaction = () => {
//   const { user } = use(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const handleAddTransaction = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const type = e.target.type.value;
//     const category = e.target.category.value;
//     const amount = parseFloat(e.target.amount.value);
//     const description = e.target.description.value;
//     const date = e.target.date.value;

//     const newTransaction = {
//         type, category, amount, description, date,
//         userName: user?.displayName,
//         userEmail: user?.email
//     }

//     fetch('http://localhost:3000/transactions',{
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(newTransaction),
//     })
//     .then(res=> res.json())
//     .then(data =>{
//       toast.success('Transaction Successfully added')
//       console.log(data);
//       e.target.reset()
//       setLoading(false)
     
//     })
//     .catch((error)=>{
//         toast.error('Failed add transaction', error)
//       })

//   };

//   if(loading){
//     return <LoadingSpinner></LoadingSpinner>
//   }

//   return (
//     <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
//       <div className="card-body p-6 relative">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Add New Transaction
//         </h2>
//         <form onSubmit={handleAddTransaction} className="space-y-4">
//           {/* Type Field */}
//           <div>
//             <label className="label font-medium">Type</label>
//             <select name="type">
//               <option value="income">Income</option>
//               <option value="expense">Expense</option>
//             </select>
//           </div>

//           {/* Category Dropdown */}
//           <div>
//             <label className="label font-medium">Category</label>
//             <select
//               defaultValue={""}
//               name="category"
//               required
//               className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
//             >
//               <option value="" disabled>
//                 Select category
//               </option>
//               <option value="Salary">Salary</option>
//               <option value="Shopping">Shopping</option>
//               <option value="Food">Food</option>
//               <option value="Bills">Bills</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Amount Field */}
//           <div>
//             <label className="label font-medium">Amount</label>
//             <input
//               type="number"
//               name="amount"
//               required
//               placeholder="Enter amount"
//               className="border border-gray-300 p-2 w-full rounded-full focus:border-0 focus:outline-gray-200"
//             />
//           </div>

//           {/* Description Textarea */}
//           <div>
//             <label className="label font-medium">Description</label>
//             <textarea
//               name="description"
//               required
//               rows="3"
//               className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
//               placeholder="Enter description"
//             ></textarea>
//           </div>

//           {/* Date */}
//           <div>
//             <label className="label font-medium">Date</label>
//             <input
//               type="date"
//               name="date"
//               required
//               className="border border-gray-300 p-2 w-full rounded-full focus:border-0 focus:outline-gray-200 "
//               placeholder="Enter description"
//             />
//           </div>

//           {/* User Info Name */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 User Name
//               </label>
//               <input
//                 type="text"
//                 value={user?.displayName || ""}
//                 readOnly
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 User Email
//               </label>
//               <input
//                 type="email"
//                 value={user?.email || ""}
//                 readOnly
//                 className="input input-bordered w-full"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
//           >
//             Add Transaction
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTransaction;



import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";

const AddTransaction = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setLoading(true);

    const type = e.target.type.value;
    const category = e.target.category.value;
    const amount = parseFloat(e.target.amount.value);
    const description = e.target.description.value;
    const date = e.target.date.value;

    const newTransaction = {
      type,
      category,
      amount,
      description,
      date,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(" Transaction added successfully!");
        e.target.reset();
        setLoading(false);
      })
      .catch(() => {
        toast.error(" Failed to add transaction");
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      {/* 🌈 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-sky-400 to-emerald-400 dark:from-gray-900 dark:via-slate-800 dark:to-black animate-gradient-xy"></div>

      {/* Floating Lights Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-emerald-400/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-sky-400/20 blur-3xl rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* 💳 Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-white/30 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-emerald-700 dark:text-emerald-400">
          💰 Add New Transaction
        </h2>

        <form onSubmit={handleAddTransaction} className="space-y-5">
          {/* Type */}
          <div>
            <label className="label font-medium text-gray-700 dark:text-gray-300">Type</label>
            <select
              name="type"
              className="select w-full rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-400"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="label font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="category"
              required
              className="select w-full rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-400"
              defaultValue=""
            >
              <option disabled value="">
                Select category
              </option>
              <option value="Salary">Salary</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="label font-medium text-gray-700 dark:text-gray-300">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              required
              className="input input-bordered w-full rounded-full dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Enter description"
              required
              className="textarea w-full rounded-2xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-400"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="label font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              required
              className="input input-bordered w-full rounded-full dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-300">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full rounded-full dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="label font-medium text-gray-700 dark:text-gray-300">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full rounded-full dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Add Transaction
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTransaction;


