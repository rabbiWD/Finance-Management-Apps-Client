
import React from "react";
import planningImg from '../../assets/savings.png';
import { motion } from "framer-motion";

const Planning = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
             Why Financial Planning Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
            Financial planning isn’t just about saving — it’s about creating a roadmap for your future.
            Whether it's buying a home, starting a business, or retiring early, planning your finances ensures
            you reach your goals confidently and without stress.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-3 text-lg">
            <li>Helps you prepare for unexpected expenses.</li>
            <li>Improves your ability to invest wisely.</li>
            <li>Reduces financial anxiety and builds confidence.</li>
            <li>Supports long-term wealth and security.</li>
          </ul>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img
            src={planningImg}
            alt="Financial Planning"
            className="w-full md:w-[400px] rounded-3xl shadow-2xl dark:shadow-black/50 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Planning;

