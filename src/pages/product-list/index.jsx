import React, {useState} from 'react';
import {useSelector} from "react-redux";

import ProductCard from './product-card';
import {Card, Message} from 'semantic-ui-react';
import {DropDown, Spinner, Pagination} from '../../components';
import {productFilterObject, productSortObject} from '../../constants';

import './style.scss';

const ProductList = () => {

    const products = useSelector(({Products}) => Products.list)

    const [currentPage, setCurrentPage] = useState(0);
    const [productFilter, setProductFilter] = useState('all');
    const [productSort, setProductSort] = useState('new');

    const handleDropDown = (e, options) => {
        const id = e.target.closest('.dropdown').id;
        id === 'Кольори' ? setProductFilter(options.value) : setProductSort(options.value);
    }

    const productsFilter = () => {
        return products
            .filter(prod => productFilter === 'all' ? prod : prod.colors[productFilter])
            .sort((a, b) => productSort === 'new' && b.newItem - a.newItem)
            .sort((a, b) => productSort === 'priceLow' && a.price - b.price)
            .sort((a, b) => productSort === 'priceHigh' && b.price - a.price)
            .sort((a, b) => productSort === 'hot' && b.hot - a.hot)
            .map(product => <ProductCard key={product.id} product={product}/>)
    }

    const productsToShow = (length) => {
        const products = productsFilter().slice(length, length + 12)
        return products.length ?
            products : (
                <Message className='empty-product-list'>
                    <Message.Header>За вибраними критеріями нічого не знайдено</Message.Header>
                </Message>
            )
    }

    return (
        <div className="product-list__container">
            <div className="product-list__title">КАТАЛОГ</div>

            <div className="product-list__dropdown-section__flex">
                <div className="product-list__dropdown-section">

                    <DropDown
                        id={productFilterObject.filterName}
                        name={productFilter}
                        options={productFilterObject.filterOptions}
                        handleDropDown={handleDropDown}
                    />

                    <DropDown
                        id={productSortObject.sortName}
                        name={productSort}
                        options={productSortObject.sortOptions}
                        handleDropDown={handleDropDown}
                    />

                </div>
            </div>


            <div className="product-cards__container">
                {products.length ? (
                    <div className="product-cards__list">
                        <Card.Group itemsPerRow={4}>
                            {productsToShow(currentPage)}
                        </Card.Group>
                        {productsToShow(currentPage).length && <Pagination
                            productsFilter={productsFilter}
                            productsToShow={productsToShow}
                            setCurrentPage={setCurrentPage}
                        />}
                    </div>
                ) : (
                    <Spinner/>
                )}
            </div>
        </div>
    )
}

export default ProductList
