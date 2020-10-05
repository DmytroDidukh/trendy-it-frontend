import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RightBar from './right-bar';
import { ThemeContext } from '../../components/app';
import './style.scss';

const Header = () => {
  const pathname = useSelector(({ router }) => router.location.pathname);
  const { theme } = useContext(ThemeContext);

  const logo =
    theme === 'light'
      ? 'https://res.cloudinary.com/d-didukh/image/upload/v1601889295/trendy-it/logo-light_rkygqe.png'
      : 'https://res.cloudinary.com/d-didukh/image/upload/v1601889295/trendy-it/logo-dark_o9wf1x.png';

  return (
    <div className={`main-header main-header_${theme}`}>
      <div className='main-header__catalog'>
        {!pathname.includes('/catalog') && (
          <Link to={`/catalog/pages=${1}`}>
            <h3>Каталог</h3>
          </Link>
        )}
      </div>
      <div className='main-header__logo'>
        <Link to='/'>
          <img src={logo} alt={'Shop logo'} />
        </Link>
      </div>
      <RightBar />
    </div>
  );
};

export default Header;
