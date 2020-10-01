import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Message, Icon } from 'semantic-ui-react';

import ProductCard from './product-card';
import { DropDown, Spinner, Pagination } from '../../components';
import { productFilterObject, SORT_OPTIONS } from '../../constants';
import { getProducts } from '../../redux/products/products.actions';
import Filter from '../../containers/filter';

import './style.scss';

const ProductList = ({ page }) => {
  const { products, loading } = useSelector(({ Products }) => ({
    products: Products.list,
    loading: Products.loading
  }));
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [productFilter, setProductFilter] = useState('all');
  const [productSort, setProductSort] = useState('new');

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('-createdAt');
  // const [query, setQuery] = useState({
  //   filter,
  //   sort,
  //   page: +page,
  //   limit: 12
  // });

  const [filterVisibility, setFilterVisibility] = useState(false);

  const query = useMemo(
    () => ({
      filter,
      sort,
      page: +page,
      limit: 12
    }),
    [sort, filter, page]
  );
  //console.log(query)

  useEffect(() => {
    console.log(query);
    dispatch(getProducts(query));
    window.scroll(0, 0);
  }, [query, dispatch, sort, filter]);

  const handleSortChange = (e, { value }) => {
    setSort(value);
  };

  const productsFilter = () => {
    return products
      .filter((prod) =>
        productFilter === 'all' ? prod : prod.colors[productFilter]
      )
      .sort(
        (a, b) =>
          productSort === 'new' &&
          (b.newItem - a.newItem ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      )
      .sort((a, b) => productSort === 'priceLow' && a.price - b.price)
      .sort((a, b) => productSort === 'priceHigh' && b.price - a.price)
      .sort((a, b) => productSort === 'hot' && b.hot - a.hot)
      .sort((a, b) => productSort === 'sale' && b.sale - a.sale)
      .map((product) => <div>g</div>);
  };

  const setProductsToShow = (lengthIndex) => {
    const products = productsFilter();
    const isEnoughProducts = products.length >= 12;

    const productsToShow = isEnoughProducts
      ? products.slice(lengthIndex, lengthIndex + 12)
      : products.slice(0, 12);

    return products.length ? (
      productsToShow
    ) : (
      <Message className='empty-product-list'>
        <Message.Header>
          За вибраними критеріями нічого не знайдено
        </Message.Header>
      </Message>
    );
  };

  const setListResponsive = () => {
    const width = window.innerWidth;
    return width <= 350 ? 1 : width <= 500 ? 2 : width <= 768 ? 3 : 4;
  };

  return (
    <div className='product-list__container'>
      <div className='product-list__title'>КАТАЛОГ</div>

      <div className='product-list__dropdown-section'>
        <Button
          className={'small-wide-filter-btn'}
          onClick={() => setFilterVisibility(!filterVisibility)}
          secondary
        >
          <Icon name='filter' />
        </Button>
        <DropDown
          value={sort}
          options={SORT_OPTIONS.options}
          handleDropDown={handleSortChange}
        />
      </div>

      {!loading ? (
        <div className='product-cards__container'>
          <Filter
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            filterVisibility={filterVisibility}
            setFilterVisibility={setFilterVisibility}
          />
          {products.length && !loading ? (
            <div className='product-cards__list'>
              <Card.Group itemsPerRow={setListResponsive()}>
                {products.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </Card.Group>
              {!!setProductsToShow(currentPage).length && (
                <Pagination
                  productsFilter={productsFilter}
                  setProductsToShow={setProductsToShow}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          ) : (
            <Message className='empty-product-list'>
              <Message.Header>
                За вибраними критеріями нічого не знайдено
              </Message.Header>
            </Message>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProductList;
