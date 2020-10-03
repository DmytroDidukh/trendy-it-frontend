import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const NotFound = () => {
  return (
    <div className='not-found'>
      <img
        src='https://res.cloudinary.com/d-didukh/image/upload/v1601750350/trendy-it/404_mzxtwn.png'
        alt='NOT FOUND'
      />
      <p>Сторінку не знайдено...</p>
      <Link to={'/'}>
        <button className='basic-button'>на головну</button>
      </Link>
    </div>
  );
};

export default NotFound;
