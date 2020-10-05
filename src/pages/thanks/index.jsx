import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const ThanksPage = () => {
  return (
    <div className='thanks-page'>
      <img
        className={'page-logo'}
        src='https://res.cloudinary.com/d-didukh/image/upload/v1601889295/trendy-it/logo-large_phy39y.png'
        alt='Trendy IT'
      />
      <h4>Дякуємо за покупку!</h4>
      <Link to='/'>
        <button className='basic-button'>На головну</button>
      </Link>
    </div>
  );
};

export default ThanksPage;
