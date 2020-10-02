import React from 'react';

import './style.scss';

const Spinner = ({ styles }) => {
  return (
    <div className='spinner-it' style={{ width: styles || 'initial' }}>
      <div className='spinner-it__flag'>
        <span />
        <span />
        <span />
      </div>
      <p>Завантаження...</p>
    </div>
  );
};

export default Spinner;
