import React, { use, useEffect, useState } from "react";
import { AuthContext } from "./../../Context/AuthContext";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell } from "recharts";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {motion} from 'framer-motion';


const Reports = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

//   const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#a78bfa", "#fb923c"];
  const COLORS = [
    "#06b6d4", // cyan
    "#f43f5e", // rose
    "#10b981", // emerald
    "#f59e0b", // amber
    "#6366f1", // indigo
    "#ec4899", // pink
  ];


  useEffect(() => {
    if (user?.email) {
      fetch(`https://finance-management-apps-server.vercel.app/my-transaction?email=${user.email}`)
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

     <motion.div
      className="min-h-screen py-16 px-4 flex justify-center items-center 
      bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] 
      dark:from-[#050816] dark:via-[#111827] dark:to-[#1f2937] text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full bg-white/10 backdrop-blur-lg 
        rounded-2xl shadow-2xl p-10 border border-white/20"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-10 
          bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
          bg-clip-text text-transparent tracking-wide"
        >
          Reports Summary
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 🥧 Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="bg-white/10 p-6 rounded-xl shadow-lg border border-white/20 
            hover:shadow-cyan-400/30 hover:scale-[1.02] transition-all"
          >
            <h3 className="text-xl font-semibold text-center mb-4 text-cyan-300">
              Category-wise Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
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
          </motion.div>

          {/* 📊 Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="bg-white/10 p-6 rounded-xl shadow-lg border border-white/20 
            hover:shadow-purple-400/30 hover:scale-[1.02] transition-all"
          >
            <h3 className="text-xl font-semibold text-center mb-4 text-purple-300">
              Monthly Totals
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="total" fill="#8b5cf6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
