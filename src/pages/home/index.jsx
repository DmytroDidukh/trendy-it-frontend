import React from "react";
import {useSelector} from "react-redux";

import {Banners, HotItems, Slider} from "../../containers";
import {Spinner} from "../../components";
import './style.scss'

const Home = () => {
    const products = useSelector(({Products}) => Products.list)

    return (
        <div className='home'>
            {
                products.length ? (
                    <>
                        <div className='home__hero'>
                            <Slider/>
                            <Banners/>
                        </div>
                        <HotItems/>
                    </>
                ) : (
                    <Spinner/>
                )
            }
        </div>
    )
}

export default Home
