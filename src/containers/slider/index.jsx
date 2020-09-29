import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';
import { useSelector } from 'react-redux';

const Slider = () => {
  const sliderProducts = useSelector(({ Products }) =>
    Products.list.filter((item) => item.available && item.toSlider)
  );

  console.log(sliderProducts);

  return (
    <Carousel className='slider'>
      {sliderProducts.reverse().map((product) => (
        <Carousel.Item key={product.id}>
          <div
            style={{
              background: `url(${product.images.slider.url}) no-repeat center center`,
              backgroundSize: 'cover'
            }}
            className='slider__image'
          />
          <Carousel.Caption>
            <h2 className='product-main-title'>{product.name}</h2>
            <Link to={`/catalog/${product.id}`}>
              <Button variant='dark'>КУПИТИ {product.price} UAH</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
