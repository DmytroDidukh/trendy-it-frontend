import React from "react";
import {Link} from 'react-router-dom'

import {Banners, HotItems, Slider} from "../../containers";
import './style.scss'

const Home = () => {
    return (
        <div className='home'>
            <div className='home__hero'>
                <Slider/>
                <Banners/>
            </div>
            <HotItems/>
        </div>
    )
}

export default Home
