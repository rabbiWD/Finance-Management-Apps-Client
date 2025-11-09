import React from "react";
import planningImg from '../../assets/savings.png'

const Planning = () => {
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            📈 Why Financial Planning Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Financial planning isn’t just about saving — it’s about creating a
            roadmap for your future. Whether it's buying a home, starting a
            business, or retiring early, planning your finances ensures you
            reach your goals confidently and without stress.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Helps you prepare for unexpected expenses.</li>
            <li>Improves your ability to invest wisely.</li>
            <li>Reduces financial anxiety and builds confidence.</li>
            <li>Supports long-term wealth and security.</li>
          </ul>
        </div>
        <img
          src={planningImg}
          alt="Financial Planning"
          className="w-full md:w-[400px] mx-auto drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default Planning;
