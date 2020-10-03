import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { COLORS_DATA } from '../../constants';
import './style.scss';
import { Ranger } from '../../components';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const Filter = ({
  query: { filter },
  setQuery,
  loading,
  filterVisibility,
  setFilterVisibility
}) => {
  const dispatch = useDispatch();

  const [isFilterTouched, setIsFilterTouched] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setPriceRange(filter.priceRange || [0, 5000]);
    setColors(filter.colors || []);
  }, [filter]);

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
      },
      page: 1
    }));

    setFilterVisibility(false);
    setIsFilterTouched(false);
    dispatch(push(`/catalog/pages=${1}`));
  };

  const onClearFilter = () => {
    setQuery((prev) => ({
      filter: {},
      sort: prev.sort,
      page: 1
    }));

    dispatch(push(`/catalog/pages=${1}`));
    setIsFilterTouched(false);
    //setColors([])
    //setPriceRange([0, 5000])
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
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
