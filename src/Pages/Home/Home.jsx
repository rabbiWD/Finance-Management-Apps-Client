import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Budget from '../../Components/Budget/Budget';
import Planning from '../../Components/Planning/Planning';

const Home = () => {

    return (
        <div>
            <Banner/>
            <div>
                <Budget/>
                <Planning/>
            </div>
        </div>
    );
};

export default Home;