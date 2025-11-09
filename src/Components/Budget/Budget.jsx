import React from "react";
import budgetingImg from '../../assets/budget.png'

const Budget = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <img
          src={budgetingImg}
          alt="Budgeting Tips"
          className="w-full md:w-[400px] mx-auto drop-shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            💡 Smart Budgeting Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Proper budgeting is the foundation of financial freedom. Set a clear
            monthly budget, categorize your expenses, and track your spending
            regularly. This will help you understand where your money goes and
            how to save more effectively.
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Track every expense — even the small ones.</li>
            <li>Set a savings goal before spending.</li>
            <li>Use the 50/30/20 rule: Needs, Wants, Savings.</li>
            <li>Review and adjust your budget monthly.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Budget;
