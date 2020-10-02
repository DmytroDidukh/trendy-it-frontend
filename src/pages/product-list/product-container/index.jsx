import React from 'react';
import { Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import ProductCard from './product-card';
import { Pagination } from '../../../components';

const ProductContainer = ({ setQuery }) => {
  const { products, pagination, loading } = useSelector(({ Products }) => ({
    products: Products.list,
    pagination: Products.pagination,
    loading: Products.loading
  }));

  const setListResponsive = () => {
    const width = window.innerWidth;
    return width <= 350 ? 1 : width <= 500 ? 2 : width <= 768 ? 3 : 4;
  };

  return (
    <>
      {products.length && !loading ? (
        <div className='product-cards__list'>
          <Card.Group itemsPerRow={setListResponsive()}>
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </Card.Group>
          {!!products.length && (
            <Pagination setQuery={setQuery} pagination={pagination} />
          )}
        </div>
      ) : (
        <div className='empty-product-list'>
          За вибраними критеріями нічого не знайдено
        </div>
      )}
    </>
  );
};

export default ProductContainer;
