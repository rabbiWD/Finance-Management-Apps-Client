import React from 'react';
import { Link } from 'react-router';
import bannerImg from '../../assets/Finance.png';

const Banner = () => {
    return (
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Content */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Take Control of Your <span className="text-blue-600">Finances</span> Today 💰
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Track your income, monitor your expenses, and achieve your savings goals with FinEase — your all-in-one personal finance manager.
          </p>
          <Link
            to="/add-transaction"
            className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0">
          <img
            src={bannerImg}
            alt="Finance Illustration"
            className="w-full md:w-[480px] drop-shadow-lg"
          />
        </div>
      </div>
    </section>
    );
};

export default Banner;