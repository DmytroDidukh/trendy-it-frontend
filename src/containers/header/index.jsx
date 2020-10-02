import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RightBar from './right-bar';
import { ThemeContext } from '../../components/app';
import './style.scss';

const Header = () => {
  const pathname = useSelector(({ router }) => router.location.pathname);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`main-header main-header_${theme}`}>
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
