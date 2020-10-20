import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import { Banners, HotItems, Slider } from '../../containers';
import { Spinner } from '../../components';
import { getProducts } from '../../redux/products/products.actions';
import { getBanners } from '../../redux/banners/banners.actions';
import './style.scss';

const Home = () => {
  const { products, banners } = useSelector(({ Products, Banners }) => ({
    products: Products.list,
    banners: Banners.list
  }));
  const dispatch = useDispatch();

  const [FBVisible, setFBVisible] = useState(false);

  useEffect(() => {
    const filter = {
      isHomeQuery: true
    };

    dispatch(getProducts({ filter }));
    dispatch(getBanners());
    window.scroll(0, 0);
  }, [dispatch]);

  console.log(FBVisible);

  return (
    <div className='home'>
      {products.length ? (
        <>
          <div className='home__hero'>
            <Slider />
            {!!banners.length && <Banners />}
          </div>
          <HotItems />
        </>
      ) : (
        <Spinner />
      )}
      <button
        className={'basic-button'}
        onClick={() => setFBVisible(!FBVisible)}
      >
        click
      </button>
      {FBVisible && (
        <MessengerCustomerChat
          pageId={'101134448446261'}
          appId={'713686025904610'}
        />
      )}
    </div>
  );
};

export default Home;
