import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { COLORS_DATA } from '../../constants';
import './style.scss';
import { Ranger } from '../../components';

const Filter = ({ loading, filterVisibility, setFilterVisibility }) => {
  const [priceRange, setPriceRange] = useState([100, 2000]);

  return (
    <div
      className={`filter-block ${
        filterVisibility ? 'filter-block_active' : ''
      }`}
    >
      {filterVisibility && (
        <Icon
          name='close'
          className={'close-filter-btn'}
          onClick={() => setFilterVisibility(false)}
        />
      )}
      <div className={'filter-block__control'}>
        <Button loading={loading} disabled={true} secondary>
          Застосувати
        </Button>
        <Button basic>Очистити</Button>
      </div>
      <div className={'filter-block__price'}>
        <h4>Ціна:</h4>
        <Ranger values={priceRange} setValues={setPriceRange} />
      </div>
      <div className={'filter-block__colors'}>
        <h4>Кольори:</h4>
        <div className={'filter-block__colors-container'}>
          {Object.values(COLORS_DATA).map((color) => (
            <div
              key={color.hex}
              className={'filter-block__colors-container__color'}
              style={{ backgroundColor: color.hex }}
              data-id={color.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
