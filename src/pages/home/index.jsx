import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Banners, HotItems, Slider } from '../../containers';
import { Spinner } from '../../components';
import { getProducts } from '../../redux/products/products.actions';
import { getBanners } from '../../redux/banners/banners.actions';
import './style.scss';

const Home = () => {
  const products = useSelector(({ Products }) => Products.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const filter = {
      isHomeQuery: true
    };

    dispatch(getProducts({ filter }));
    dispatch(getBanners());
    window.scroll(0, 0);
  }, [dispatch]);

  return (
    <div className='home'>
      {products.length ? (
        <>
          <div className='home__hero'>
            <Slider />
            <Banners />
          </div>
          <HotItems />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Home;
