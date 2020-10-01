import React from 'react';
import { Link } from 'react-router-dom';

import RightBar from './right-bar';
import './style.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  const pathname = useSelector(({ router }) => router.location.pathname);

  return (
    <div className='main-header'>
      <div className='main-header__logo'>
        <Link to='/'>
          <img src={'https://i.imgur.com/RUBp39w.png'} alt={'Shop logo'} />
          <h1>Trendy IT</h1>
        </Link>
      </div>
      <div className='main-header__catalog'>
        {!pathname.includes('/catalog') && (
          <Link to={`/catalog/pages=${1}`}>
            <h3>Каталог</h3>
          </Link>
        )}
      </div>
      <RightBar />
    </div>
  );
};

export default Header;
