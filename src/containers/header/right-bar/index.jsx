import React, { createRef, useContext, useRef, createElement } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Label, Radio, Ref } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { SearchBar, Wishlist } from '../../index';
import { ThemeContext } from '../../../components/app';
import {
  getFromLocalStorage,
  setToLocalStorage
} from '../../../services/local-storage';

const RightBar = () => {
  const cartItems = useSelector(({ Cart }) => Cart.list);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (_, { checked }) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    setToLocalStorage('theme', newTheme);
  };

  const toggleRef = useRef(null);
  const ToggleButton = (
    <div ref={toggleRef} id={'toggle-container'}>
      <Radio
        toggle
        checked={getFromLocalStorage('theme') === 'dark'}
        onChange={handleThemeChange}
      />
    </div>
  );

  const onRefClick = () => {
    //toggleRef.current.click()
    //toggleRef.current.lastChild.click()
    toggleRef.current.firstChild.click();
    console.dir(toggleRef.current.firstChild);
  };

  return (
    <div className='main-header__right-bar'>
      <SearchBar />
      <Wishlist />
      <Link to='/cart'>
        <Icon name='cart' className='header-icons' />
        {!!cartItems.length && (
          <Label circular className='cart-label'>
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Label>
        )}
      </Link>
      <div className={'theme-control'}>
        <Icon name={'sun'} onClick={onRefClick} />
        <Ref innerRef={toggleRef}>
          <Radio
            toggle
            checked={getFromLocalStorage('theme') === 'dark'}
            onChange={handleThemeChange}
          />
        </Ref>
        <Icon name={'moon'} onClick={onRefClick} />
      </div>
    </div>
  );
};

export default RightBar;
