import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import ProductCard from './product-card';
import { Pagination } from '../../../components';

const ProductContainer = ({ page }) => {
  const { products, loading } = useSelector(({ Products }) => ({
    products: Products.list,
    loading: Products.loading
  }));

  const [currentPage, setCurrentPage] = useState(page);

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
          {/*       {!!products.length && (
                      <Pagination
                          productsFilter={() => 2}
                          setProductsToShow={() => {}}
                          setCurrentPage={setCurrentPage}
                      />
                  )}*/}
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
