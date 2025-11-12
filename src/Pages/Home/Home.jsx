import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Budget from '../../Components/Budget/Budget';
import Planning from '../../Components/Planning/Planning';
import OverView from '../../Components/OverView/OverView';

const Home = () => {

    return (
        <div>
            <Banner/>
            <div>
                <OverView/>
            </div>
            <div>
                <Budget/>
                <Planning/>
            </div>
        </div>
    );
};

export default Home;