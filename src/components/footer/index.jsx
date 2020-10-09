import React, { useContext } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../app';
import './style.scss';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`footer-container footer-container_${theme}`}>
      <div className='footer-list'>
        <div className='footer-list__item'>
          <Link className='footer-list__item-content' to='/about-us'>
            Про нас
          </Link>
        </div>

        <div className='footer-list__item'>
          <Link className='footer-list__item-content' to='/production'>
            Наша продукція
          </Link>
        </div>

        <div className='footer-list__item'>
          <div className='footer-list__item-social'>
            <a
              className='telegram'
              href='https://web.telegram.org/#/login'
              target='-_blank'
            >
              <Icon name='telegram' size='big' />
            </a>
            <a
              className='viber'
              href='https://www.viber.com/ru/'
              target='-_blank'
            >
              <Icon name='viber' size='big' />
            </a>
            <a
              className='facebook'
              href='https://www.facebook.com'
              target='-_blank'
            >
              <Icon name='facebook official' size='big' />
            </a>
            <a
              className='instagram'
              href='https://www.instagram.com/trendy_it_bags/'
              target='-_blank'
            >
              <Icon name='instagram' size='big' />
            </a>
          </div>
        </div>
        <div className='footer-list__item'>
          <Link
            className='footer-list__item-content'
            to='/payment-and-shipping'
          >
            Оплата та доставка
          </Link>
        </div>

        <div className='footer-list__item'>
          <Link className='footer-list__item-content' to='/contacts'>
            Зв'язатися
          </Link>
        </div>
      </div>
      <div className={'footer-company'}>
        Copyright © DiVi & Co.{' '}
        <img src='/images/divi-shrimp.png' alt='DiVi logo' /> All Rights
        Reserved.
      </div>
    </div>
  );
};

export default Footer;
