import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

import './style.scss'

const NumberInput = ({ onChangeQuantity, quantity }) => {

  return (
    <div className='number-input'>
      <Button
          basic
        className='number-input__button'
        onClick={() => onChangeQuantity(-1)}
        disabled={quantity <= 1}
      >
        <Icon name='minus'/>
      </Button>
      <input
        className='number-input__input'
        type='number'
        value={quantity}
        onChange={(e) => onChangeQuantity(e.target.value, true)}
      />
      <Button
          basic
          className='number-input__button'
          onClick={() => onChangeQuantity(1)}>
          <Icon name='plus'/>
      </Button>
    </div>
  );
};

export default NumberInput;
