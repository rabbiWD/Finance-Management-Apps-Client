import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router";
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
      fetch(`http://localhost:3000/my-transaction?email=${user.email}&sortBy=${sortBy}&order=${order}`)
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
    fetch(`http://localhost:3000/transactions/${trans._id}`, {
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-5">My Transaction</h2>

      
      {/* Sort Options */}
      <div className="flex justify-end gap-2 mb-5">
        <select
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        <select
          className="select select-bordered"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {transactions.length === 0 && loading ? (
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
              <h2 className="text-xl font-bold mb-3 ">
                Type: {transaction.type}
              </h2>
              <h2 className="">
                Category: {transaction.category}
              </h2>
              <p className="">Amount: {transaction.amount} tk</p>
              <p className="mb-5">
                Date: {new Date(transaction.date).toLocaleDateString()}
              </p>
              <div className="flex justify-center gap-5 mt-4">
                <Link 
                  onClick={()=> setTrans(transaction)}
                  className="btn btn-secondary sm:p-1 md:p-5 rounded-lg text-base"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  //   onClick={handleDelete}
                  className="btn btn-outline sm:p-1 md:p-5 lg:p-5 rounded-lg text-base"
                >
                  Delete
                </button>
                <Link
                  to={`/transaction-details/${transaction._id}`}
                  className="btn btn-primary sm:p-1 md:p-5 rounded-lg text-base"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {trans && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center mb-3">
              Update Transaction
            </h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <select
                name="type"
                defaultValue={trans.type}
                className="select select-bordered w-full"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>

              <input
                type="text"
                name="category"
                defaultValue={trans.category}
                placeholder="Category"
                className="input input-bordered w-full"
                required
              />

              <input
                type="number"
                name="amount"
                defaultValue={trans.amount}
                placeholder="Amount"
                className="input input-bordered w-full"
                required
              />

              <input
                type="date"
                name="date"
                defaultValue={trans.date?.slice(0, 10)}
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                defaultValue={trans.description}
                className="textarea textarea-bordered w-full"
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
  );
};

export default MyTransaction;
