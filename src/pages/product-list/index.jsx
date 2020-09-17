import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

import SubcategoryFilter from './subcategory-filter/';
import ProductCard from './product-card';
import {Card} from 'semantic-ui-react';
import {DropDown, Spinner, Pagination} from '../../components';
import {getFromLocalStorage, setToLocalStorage} from '../../services/local-storage';
import {productFilterObject, productSortObject} from '../../constants';

import './style.scss';

const ProductList = ({location: {query}, match: {params}}) => {

    const {subcategories, products, router, categories} = useSelector(({Products, Subcategories, router, Categories}) => ({
        subcategories: Subcategories.list,
        products: Products.list,
        router: router.location.pathname.slice(1),
        categories: Categories.list
    }))

    const [currentPage, setCurrentPage] = useState(1);

    const [categoryID, setCategoryID] = useState(null);
    const [subcategoryID, setSubategoryID] = useState(null);
    const [productFilter, setProductFilter] = useState('all');
    const [productSort, setProductSort] = useState('new');

    useEffect(() => {
        if (query && query.__typename === "Category") {
            setCategoryID(query.id);
            setSubategoryID(null)
        } else if (query && query.__typename === "Subcategory") {
            setSubategoryID(query.id);
            const subObj = subcategories.find(sub => sub.id === query.id);
            setCategoryID(subObj.category.id)
        }
    }, [query, subcategories])

    useEffect(() => {
        const catObj = categories && router && categories.find(cat => cat.name === router[0].toUpperCase() + router.slice(1))
        setCategoryID(catObj ? catObj.id : null);
    }, [categories, router])

    useEffect(() => {
        setSubategoryID(getFromLocalStorage('currentSubcategory'));
    }, [])


    const onSelectSubcategory = (id) => {
        setToLocalStorage('currentSubcategory', id);
        setSubategoryID(id);
    }

    const handleDropDown = (e, options) => {
        const id = e.target.closest('.dropdown').id;
        id === 'Розміри' ? setProductFilter(options.value) : setProductSort(options.value);
    }

    const productsFilter = () => {
        return products
            .filter(prod => prod.category.id === categoryID)
            .filter(prod => subcategoryID ? prod.subcategory.id === subcategoryID : prod)
            .filter(prod => productFilter === 'all' ? prod : prod.sizes[productFilter] > 0)
            .sort((a, b) => productSort === 'new' && new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .sort((a, b) => productSort === 'priceLow' && a.price - b.price)
            .sort((a, b) => productSort === 'priceHigh' && b.price - a.price)
            .sort((a, b) => productSort === 'rating' &&
                (b.rating.reduce((a, b) => a + b.value, 0) / b.rating.length) -
                a.rating.reduce((a, b) => a + b.value, 0) / a.rating.length)
            .map(product => <ProductCard key={product.id} product={product}/>)
    }

    const productsToShow = (length) => {

        console.log(productsFilter().slice(length, length + 10))
        return productsFilter().slice(length === 1 ? 0 : length, length + 10)
    }

    return (
        <div className="product-list__container">
            <div className="product-list__title">{params.category.toUpperCase()}</div>
            <div className="subcategories-filter__container">
                <SubcategoryFilter
                    onSelectSubcategory={onSelectSubcategory}
                    selected={subcategoryID}
                    subcategories={subcategories
                        .filter(sub => sub.category.id === categoryID)}/>
            </div>

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
                        <Pagination
                            productsFilter={productsFilter}
                            productsToShow={productsToShow}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                ) : (
                    <Spinner/>
                )}
            </div>
        </div>
    )
}

export default ProductList
