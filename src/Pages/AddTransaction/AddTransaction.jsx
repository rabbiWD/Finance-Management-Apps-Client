import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

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
        type, category, amount, description, date,
        userName: user?.displayName,
        userEmail: user?.email
    }

    fetch('http://localhost:3000/transactions',{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
    .then(res=> res.json())
    .then(data =>{
      toast.success('Transaction Successfully added')
      console.log(data);
      e.target.reset()
      setLoading(false)
     
    })
    .catch((error)=>{
        toast.error('Failed add transaction', error)
      })

  };

  if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add New Transaction
        </h2>
        <form onSubmit={handleAddTransaction} className="space-y-4">
          {/* Type Field */}
          <div>
            <label className="label font-medium">Type</label>
            <select name="type">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={""}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Salary">Salary</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount Field */}
          <div>
            <label className="label font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              required
              placeholder="Enter amount"
              className="border border-gray-300 p-2 w-full rounded-full focus:border-0 focus:outline-gray-200"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="label font-medium">Date</label>
            <input
              type="date"
              name="date"
              required
              className="border border-gray-300 p-2 w-full rounded-full focus:border-0 focus:outline-gray-200 "
              placeholder="Enter description"
            />
          </div>

          {/* User Info Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
