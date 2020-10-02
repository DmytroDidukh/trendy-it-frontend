import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { push } from 'connected-react-router';

import { DropDown, Spinner } from '../../components';
import { SORT_OPTIONS } from '../../constants';
import { getProducts } from '../../redux/products/products.actions';
import Filter from '../../containers/filter';
import ProductContainer from './product-container';

import './style.scss';

const ProductList = ({ page }) => {
  const { loading } = useSelector(({ Products }) => ({
    loading: Products.loading
  }));
  const dispatch = useDispatch();

  const [filterVisibility, setFilterVisibility] = useState(false);
  const [query, setQuery] = useState({
    filter: {},
    sort: '-createdAt',
    page: +page
  });

  useEffect(() => {
    dispatch(getProducts(query));
    window.scroll(0, 0);
  }, [query, dispatch]);

  const handleSortChange = (e, { value }) => {
    setQuery({ ...query, sort: value, page: 1 });
    dispatch(push(`/catalog/pages=${1}`));
  };

  const onClearFilter = () => {
    setQuery({
      filter: {},
      sort: query.sort,
      page: 1
    });

    dispatch(push(`/catalog/pages=${1}`));
  };

  return (
    <div className='product-list__container'>
      <div className='product-list__title'>КАТАЛОГ</div>

      <div className='product-list__dropdown-section'>
        <div>
          <Button
            className={'small-wide-filter-btn'}
            onClick={() => setFilterVisibility(!filterVisibility)}
            secondary
          >
            <Icon name='filter' />
          </Button>
          <Button
            className={'small-wide-clear-btn'}
            onClick={onClearFilter}
            basic
          >
            <Icon name='redo' />
          </Button>
        </div>
        <DropDown
          value={query.sort}
          options={SORT_OPTIONS.options}
          handleDropDown={handleSortChange}
        />
      </div>
      <div className='product-cards__container'>
        <Filter
          loading={loading}
          query={query}
          setQuery={setQuery}
          filterVisibility={filterVisibility}
          setFilterVisibility={setFilterVisibility}
        />
        {!loading ? <ProductContainer setQuery={setQuery} /> : <Spinner />}
      </div>
    </div>
  );
};

export default ProductList;
