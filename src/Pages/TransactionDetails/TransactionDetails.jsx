import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {motion} from 'framer-motion';

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // let transactionData = null;
    fetch(`http://localhost:3000/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Transaction:", data);
        const transactionData = data.result || data;
        setTransaction(transactionData);

        fetch(`http://localhost:3000/transactions/category/${data.result.category}`)
        .then(res=> res.json())
        .then((data)=>{
            console.log(data);
            const total = data.result.reduce((sum, tk) => sum + Number(tk.amount), 0);
            console.log(total);
            setTotalAmount(total);
        })

      })
      .catch((err) => console.error("Error fetching details:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!transaction) {
    return <p>Transaction Not Found</p>;
  }

  return (
    // <div className="flex justify-center mt-10">
    //   <div className="bg-outline shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
    //     <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
    //     <div className="space-y-3">
    //       <div className="flex justify-between">
    //         <span className="font-medium">Type:</span>
    //         <span className="">{transaction.type}</span>
    //       </div>

    //       <div className="flex justify-between">
    //         <span className="font-medium">Category:</span>
    //         <span className="">{transaction.category}</span>
    //       </div>

    //       <div className="flex justify-between">
    //         <span className="font-medium">Amount:</span>
    //         <span className="text-green-600 font-semibold">
    //           {transaction.amount} tk
    //         </span>
    //       </div>

    //       <div className="flex justify-between">
    //         <span className="font-medium">Description:</span>
    //         <span className="">{transaction.description}</span>
    //       </div>

    //       <div className="flex justify-between">
    //         <span className="font-medium">Date:</span>
    //         <span className="">{transaction.date}</span>
    //       </div>

    //       <div className="flex justify-between border-t pt-2 mt-2">
    //         <span className="font-bold">
    //           Total in this category:
    //         </span>
    //         <span className="font-bold text-blue-600">{totalAmount} tk</span>
    //       </div>

    //       {/* <p>Type: {transaction.type}</p> */}
    //       {/* <p>Category: {transaction.category}</p>
    //             <p>Amount: {transaction.amount} tk</p>
    //             <p>Description: {transaction.description}</p> */}
    //       {/* <p>Date: {new Date(transaction.date).toLocaleDateString()}</p> */}
    //       {/* <p>Date: {transaction.date}</p>
    //             <p>Total in this category: {totalAmount} tk</p> */}
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen flex justify-center items-start py-12 bg-gradient-to-br from-cyan-300 via-emerald-300 to-sky-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700 rounded-3xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-emerald-700 dark:text-emerald-400">
           Transaction Details
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-inner">
            <span className="font-medium">Type:</span>
            <span className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-500"}`}>
              {transaction.type}
            </span>
          </div>

          <div className="flex justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-inner">
            <span className="font-medium">Category:</span>
            <span className="font-semibold">{transaction.category}</span>
          </div>

          <div className="flex justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-inner">
            <span className="font-medium">Amount:</span>
            <span className="font-bold text-green-600">{transaction.amount} tk</span>
          </div>

          <div className="flex justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-inner">
            <span className="font-medium">Description:</span>
            <span>{transaction.description}</span>
          </div>

          <div className="flex justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-700/50 shadow-inner">
            <span className="font-medium">Date:</span>
            <span>{new Date(transaction.date).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-emerald-600 dark:to-cyan-700 text-white font-bold shadow-lg">
            <span>Total in this category:</span>
            <span>{totalAmount} tk</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionDetails;
