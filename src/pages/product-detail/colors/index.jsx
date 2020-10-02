import React from 'react';

import { COLORS_DATA } from '../../../constants';
import './style.scss';

const Colors = ({
  colors,
  selectedColor,
  setSelectedColor,
  isColorErrorVisible,
  setIsColorErrorVisible
}) => {
  const handleClick = (value) => {
    setSelectedColor(value);
    setIsColorErrorVisible(false);
  };

  return (
    <div className={'colors'}>
      {colors.map((value) => (
        <span
          onClick={() => handleClick(value)}
          style={{ backgroundColor: COLORS_DATA[value].hex }}
          key={value}
          className={`colors__item ${
            selectedColor === value ? 'colors__selected' : ''
          }`}
        />
      ))}
      {isColorErrorVisible && (
        <div className='colors__error'>Виберіть колір</div>
      )}
    </div>
  );
};

export default Colors;
