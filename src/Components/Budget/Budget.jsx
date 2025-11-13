import React from "react";
import { motion } from "framer-motion";
import budgetingImg from "../../assets/budget.png";

const Budget = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/*  Animated Image */}
        <motion.img
          src={budgetingImg}
          alt="Budgeting Tips"
          className="w-full md:w-[420px] mx-auto drop-shadow-2xl rounded-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/*  Animated Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-5 leading-snug">
             Smart Budgeting Tips
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            Proper budgeting is the foundation of financial freedom. Set a clear
            monthly budget, categorize your expenses, and track your spending
            regularly. This helps you understand where your money goes and how
            to save more effectively.
          </p>

          <motion.ul
            className="list-disc pl-6 text-gray-800 dark:text-gray-300 space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <li> Track every expense — even the small ones.</li>
            <li> Set a savings goal before spending.</li>
            <li> Use the <strong>50/30/20 rule</strong>: Needs, Wants, Savings.</li>
            <li> Review and adjust your budget monthly.</li>
          </motion.ul>

          {/*  Animated Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Budgeting Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Budget;
