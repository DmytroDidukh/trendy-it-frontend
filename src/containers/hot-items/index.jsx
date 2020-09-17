import React, {useState} from "react";
import {useSelector} from "react-redux";
import Carousel from 'react-multi-carousel';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

import {RESPONSIVE} from "../../constants/carousel.options";

import 'react-multi-carousel/lib/styles.css';
import './style.scss'


const HotItems = () => {
    const {products} = useSelector(({Products}) => ({
        products: Products.list.filter(item => item.hot),
    }))

    const productList = products.map(item => (
        <div key={item.id}
             className='hot__item'>
            <div style={{
                background: `url(${item.images.product[0].link}) no-repeat center center`,
                backgroundSize: 'cover'
            }}
                 className='hot__item-image'/>
            <div className='hot__content'>
                <h2>{item.name}</h2>
                <Link to={`/catalog/${item.id}`}>
                    <Button variant='outline-dark'>
                        КУПИТИ {item.price} UAH
                    </Button>
                </Link>
            </div>
        </div>
    ))

    return (
        <div className='hot'>
            <h2>HOT</h2>
            <Carousel
                className='hot__carousel'
                responsive={RESPONSIVE}
                swipeable={false}
            >
                {productList}
            </Carousel>
        </div>
    )
}

export default HotItems
