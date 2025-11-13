import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router";
import {motion} from 'framer-motion'
import Swal from "sweetalert2";

const MyTransaction = () => {
  // const {id} = useParams
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [trans, setTrans] = useState(null)
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt"); 
  const [order, setOrder] = useState("desc"); 
  const navigate = useNavigate()

  useEffect(() => {
    // if (user?.email) {
    if(!user?.email) return;
    setLoading(true);
      fetch(`https://finance-management-apps-server.vercel.app/my-transaction?email=${user.email}&sortBy=${sortBy}&order=${order}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setTransactions(data);
          // setLoading(false);
          setTimeout(() => {
          setTransactions(data);
          setLoading(false);
        }, 150);
        })
        .catch((error) => {
          console.log(error);
        });
    // }
  }, [user, sortBy, order]);

  //   delete transaction
  const handleDelete = (id) => {
    console.log("deleted id:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",  //#3085d6
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://finance-management-apps-server.vercel.app/transactions/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.result.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setTransactions(
                transactions.filter((transaction) => transaction._id !== id)
              );
              // setTransactions(prevTransactions=>prevTransactions.filter((transaction) => transaction._id !== id));
            }
            // navigate("/all-models");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "Failed to delete", "error");
          });
      }
    });
  };

  // Update transaction
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      type: e.target.type.value,
      category: e.target.category.value,
      description: e.target.description.value,
      amount: e.target.amount.value,
      date: e.target.date.value,
    };
    fetch(`https://finance-management-apps-server.vercel.app/transactions/${trans._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Updated!",
          text: "Transaction updated successfully",
          icon: "success",
        });
        setTransactions(
          transactions.map((transaction)=>
          transaction._id === trans._id ? {...transaction, ...updatedData} : transaction
        )
        );
        navigate(`/transaction-details/${trans._id}`, { state: { transaction: { ...trans, ...updatedData } } });
        setTrans(null)
      })
      .catch((error)=>{
        console.log(error);
      })
      
  };
  console.log(loading);

  if (loading) {
    return <LoadingSpinner />;
  }


  return (

     <div className="min-h-screen bg-gradient-to-br from-emerald-300 via-cyan-400 to-sky-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
           My Transactions
        </h2>

        {/* Sort Options */}
        <div className="flex justify-end gap-2 mb-6">
          <select
            className="select select-bordered bg-white/70 dark:bg-gray-800 dark:text-gray-200"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
          <select
            className="select select-bordered bg-white/70 dark:bg-gray-800 dark:text-gray-200"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* Transactions List */}
        {transactions.length === 0 && loading ? (
          <p className="text-center text-lg text-gray-700 dark:text-gray-300">
            No transactions found.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {transactions.map((transaction, i) => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-3xl shadow-xl border backdrop-blur-md bg-white/70 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                    }`}
                  >
                    {transaction.type.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {transaction.category}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                  {transaction.description}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {transaction.amount} Tk
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => setTrans(transaction)}
                    className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/transaction-details/${transaction._id}`}
                    className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Update Modal */}
        {trans && (
          <dialog id="update_modal" className="modal modal-open">
            <div className="modal-box bg-white dark:bg-gray-800">
              <h3 className="font-bold text-lg text-center mb-3 text-gray-900 dark:text-gray-100">
                 Update Transaction
              </h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <select
                  name="type"
                  defaultValue={trans.type}
                  className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input
                  type="text"
                  name="category"
                  defaultValue={trans.category}
                  placeholder="Category"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  defaultValue={trans.amount}
                  placeholder="Amount"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="date"
                  name="date"
                  defaultValue={trans.date?.slice(0, 10)}
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={trans.description}
                  className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white"
                  placeholder="Description"
                ></textarea>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="submit" className="btn btn-success">
                    Update
                  </button>
                  <button
                    onClick={() => setTrans(null)}
                    type="button"
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default MyTransaction;
