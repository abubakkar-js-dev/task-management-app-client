import React from 'react';
import HeroBanner from '../HeroBanner/HeroBanner';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className='bg-primary text-white p-5'>
            <Helmet>
                <title>Home | Tasky</title>
            </Helmet>
            <HeroBanner />
        </div>
    );
};

export default Home;