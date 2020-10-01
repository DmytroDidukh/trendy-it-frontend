import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { COLORS_DATA } from '../../constants';
import './style.scss';
import { Ranger } from '../../components';

const Filter = ({
  query: { filter },
  setQuery,
  loading,
  filterVisibility,
  setFilterVisibility
}) => {
  const [isFilterTouched, setIsFilterTouched] = useState(false);
  const [priceRange, setPriceRange] = useState(filter.priceRange || [0, 1000]);
  const [colors, setColors] = useState(filter.colors || []);

  const onColorSelect = (type) => {
    const index = colors.findIndex((color) => color === type);

    if (index === -1) {
      setColors([...colors, type]);
    } else {
      const newColors = [...colors];
      newColors.splice(index, 1);
      setColors(newColors);
    }
    setIsFilterTouched(true);
  };

  const onPriceRangeChange = (value) => {
    setPriceRange(value);
    setIsFilterTouched(true);
  };

  const onApplyFilter = () => {
    setQuery((prev) => ({
      ...prev,
      filter: {
        colors,
        priceRange
      }
    }));
    setFilterVisibility(false);
  };

  const onClearFilter = () => {
    setQuery({
      filter: {},
      sort: '-createdAt',
      page: 1
    });

    setIsFilterTouched(false);
  };

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
        <Button
          loading={loading}
          disabled={!isFilterTouched}
          secondary
          onClick={onApplyFilter}
        >
          Застосувати
        </Button>
        <Button basic onClick={onClearFilter}>
          Очистити
        </Button>
      </div>
      <div className={'filter-block__price'}>
        <h4>Ціна:</h4>
        <Ranger values={priceRange} setValues={onPriceRangeChange} />
      </div>
      <div className={'filter-block__colors'}>
        <h4>Кольори:</h4>
        <div className={'filter-block__colors-container'}>
          {Object.values(COLORS_DATA).map((color) => (
            <div
              key={color.hex}
              className={`filter-block__colors-container__color ${
                colors.includes(color.type) && 'active-color'
              }`}
              style={{ backgroundColor: color.hex }}
              data-id={color.type}
              onClick={() => onColorSelect(color.type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
