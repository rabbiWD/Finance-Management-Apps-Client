import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

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

        fetch(`http://localhost:3000/transactions/category/${data.result.category}`)
        .then(res=> res.json())
        .then((data)=>{
            console.log(data);
            const total = data.result.reduce((sum, tk) => sum + Number(tk.amount), 0);
            console.log(total);
            setTotalAmount(total);
        })

        const transactionData = data.result || data;
        setTransaction(transactionData);

        // now fetch all transactions of this user
    //     return fetch(
    //       `http://localhost:3000/my-transaction?email=${transactionData.userEmail}`
    //     );
    //   })
    //   .then((res) => res.json())
    //   .then((allTransactions) => {
    //     if (!transactionData) return;
        // Calculate total amount for same category
        // const total = allTransactions
        //   .filter((tk) => tk.category === transactionData.category)
        //   .reduce((sum, tk) => sum + Number(tk.amount), 0);
        // console.log(total);
        // setTotalAmount(total);
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
    <div className="flex justify-center mt-10">
      <div className="bg-outline shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span className="">{transaction.type}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Category:</span>
            <span className="">{transaction.category}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Amount:</span>
            <span className="text-green-600 font-semibold">
              {transaction.amount} tk
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Description:</span>
            <span className="">{transaction.description}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span className="">{transaction.date}</span>
          </div>

          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-bold">
              Total in this category:
            </span>
            <span className="font-bold text-blue-600">{totalAmount} tk</span>
          </div>

          {/* <p>Type: {transaction.type}</p> */}
          {/* <p>Category: {transaction.category}</p>
                <p>Amount: {transaction.amount} tk</p>
                <p>Description: {transaction.description}</p> */}
          {/* <p>Date: {new Date(transaction.date).toLocaleDateString()}</p> */}
          {/* <p>Date: {transaction.date}</p>
                <p>Total in this category: {totalAmount} tk</p> */}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
