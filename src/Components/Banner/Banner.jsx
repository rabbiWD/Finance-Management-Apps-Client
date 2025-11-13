import React from "react";
import { Link } from "react-router";
import bannerImg from "../../assets/Finance.png";
import { motion } from 'framer-motion';


const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">

        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Take Control of Your <span className="text-blue-600">Finances</span> Today
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Track your income, monitor your expenses, and achieve your savings goals with <span className="font-semibold text-blue-600">FinEase</span> — your all-in-one personal finance manager.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/add-transaction"
              className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mt-10 md:mt-0"
        >
          <motion.img
            src={bannerImg}
            alt="Finance Illustration"
            className="w-full md:w-[480px] drop-shadow-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 150 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;



