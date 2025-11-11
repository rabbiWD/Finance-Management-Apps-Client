import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyTransaction = () => {
    // const {id} = useParams
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-transaction?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTransactions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  //   delete transaction
  const handleDelete = (id) => {
    console.log("deleted id:", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/transactions/${id}`, {
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
              setTransactions(transactions.filter((transaction) => transaction._id !== id));
              // setTransactions(prevTransactions=>prevTransactions.filter((transaction) => transaction._id !== id));
            }
            // navigate("/all-models");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Error', 'Failed to delete', 'error');
          });
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-5">My Transaction</h2>

      {transactions.length === 0 ? (
        <p>Transaction Not Found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="p-5 rounded-xl shadow-md border transition-transform hover:scale-[1.02]"
              //     ${
              //     transaction.type === "Income"
              //       ? "bg-green-50 border-green-300"
              //       : "bg-red-50 border-red-300"
              //   }`
            >
              <h2 className="text-xl font-bold mb-3 text-gray-700">
                Type: {transaction.type}
              </h2>
              <h2 className="text-gray-700">
                Category: {transaction.category}
              </h2>
              <p className="text-gray-700">Amount: {transaction.amount}</p>
              <p className="text-gray-700 mb-5">
                Date: {new Date(transaction.date).toLocaleDateString()}
              </p>
              <div className="flex justify-center gap-5 mt-4">
                <Link
                  to={`/update/${transaction._id}`}
                  className="btn btn-secondary p-5 rounded-lg text-base"
                >
                  Update
                </Link>
                <button
                  onClick={()=> handleDelete(transaction._id)}
                //   onClick={handleDelete}
                  className="btn btn-outline p-5 rounded-lg text-base"
                >
                  Delete
                </button>
                <Link
                  to={`/transaction-details`}
                  className="btn btn-primary p-5 rounded-lg text-base"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTransaction;
