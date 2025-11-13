import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Budget from '../../Components/Budget/Budget';
import Planning from '../../Components/Planning/Planning';
import OverView from '../../Components/OverView/OverView';

const Home = () => {

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-500'>
            <Banner/>
            <div className='mt-10'>
                <OverView/>
            </div>
            <div className='mt-7'>
                <Budget/>
            </div>
            <div className='mt-10'>
                 <Planning/>
            </div>
        </div>
    );
};

export default Home;