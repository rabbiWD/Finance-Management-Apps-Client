import React, { use, useEffect, useState } from "react";
import { AuthContext } from "./../../Context/AuthContext";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell } from "recharts";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";


const Reports = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#a78bfa", "#fb923c"];


  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-transaction?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

  if(loading){
    return <LoadingSpinner/>
  }

  // pie chart
  const categoryTotals = transactions.reduce((accu, transaction) => {
    accu[transaction.category] =
      (accu[transaction.category] || 0) + Number(transaction.amount);
    return accu;
  }, {});
  const pieData = Object.keys(categoryTotals).map((cate) => ({
    name: cate,
    value: categoryTotals[cate],
  }));

  // bar chart
  const monthlyTotals = transactions.reduce((accu, transacton) => {
    const month = new Date(transacton.date).toLocaleString("default", {
      month: "short",
    });
    accu[month] = (accu[month] || 0) + Number(transacton.amount);
    return accu;
  }, {});
  const barData = Object.keys(monthlyTotals).map((m) => ({
    month: m,
    total: monthlyTotals[m],
  }));

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Reports Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🥧 Pie Chart for Categories */}
        <div className="card bg-base-100 shadow-xl p-5 border">
          <h3 className="text-xl font-semibold text-center mb-4">
            Category-wise Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 Bar Chart for Monthly Totals */}
        <div className="card bg-base-100 shadow-xl p-5 border">
          <h3 className="text-xl font-semibold text-center mb-4">
            Monthly Totals
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#60a5fa" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
