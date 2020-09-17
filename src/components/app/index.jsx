import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

import { getCategories } from "../../redux/categories/categories.actions";
import {getProducts} from "../../redux/products/products.actions";
import {getSubcategories} from "../../redux/subcategories/subcategories.actions";
import { Header } from '../../containers';
import {Footer, LoadingOverlay } from '../index'
import {history} from '../../store/store';
import Routes from "../../routes";
import {getWishlist} from "../../redux/wishlist/wishlist.actions";
import {getCart} from "../../redux/cart/cart.actions";
import { clearLocalStorage } from '../../services/local-storage';

import 'semantic-ui-css/semantic.min.css'

const App = () => {
    const dispatch = useDispatch();
    const {productsLoading, categoriesLoading, subcategoriesLoading, router} = useSelector(({Products, Categories, Subcategories, router}) => ({
        productsLoading: Products.loading,
        categoriesLoading: Categories.loading,
        subcategoriesLoading: Subcategories.loading,
        router: router,
    }))

    const [loadingPageVisibility, setLoadingPageVisibility] = useState(true)

    if (!localStorage.getItem('shkaff')) {
        clearLocalStorage();
    }

    useEffect(() => {
        dispatch(getWishlist())
        dispatch(getCart())
        dispatch(getCategories())
        dispatch(getProducts())
        dispatch(getSubcategories())
    }, [dispatch])

    useEffect(() => {
        if (!productsLoading && !categoriesLoading && !subcategoriesLoading) {
          setLoadingPageVisibility(false)
       }
    }, [productsLoading, categoriesLoading, subcategoriesLoading])

    return (
        <ConnectedRouter history={history}>
            <LoadingOverlay isVisible={loadingPageVisibility}/>
            <Header />
            <Routes />
            <Footer />
        </ConnectedRouter>
    )
}

export default App

