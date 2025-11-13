import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";

const OverView = () => {
  const { user } = use(AuthContext);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://finance-management-apps-server.vercel.app/overview?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOverview(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

   if(!user){
    return null;
   }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Financial Overview
      </h2>

      {overview ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Income Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-700 dark:to-green-800 p-6 rounded-2xl shadow-lg border border-green-300 dark:border-green-600 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Total Income
            </h3>
            <p className="text-4xl font-extrabold text-green-700 dark:text-green-300">
              {overview.totalIncome} Tk
            </p>
          </motion.div>

          {/* Expense Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-700 dark:to-red-800 p-6 rounded-2xl shadow-lg border border-red-300 dark:border-red-600 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Total Expenses
            </h3>
            <p className="text-4xl font-extrabold text-red-700 dark:text-red-300">
              {overview.totalExpense} Tk
            </p>
          </motion.div>

          {/* Balance Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-700 dark:to-blue-800 p-6 rounded-2xl shadow-lg border border-blue-300 dark:border-blue-600 transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Total Balance
            </h3>
            <p className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">
              {overview.totalBalance} Tk
            </p>
          </motion.div>
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          No transactions found
        </p>
      )}
    </div>
  );
};

export default OverView;
