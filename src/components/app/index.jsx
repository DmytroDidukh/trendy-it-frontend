import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

import {getProducts} from "../../redux/products/products.actions";
import { Header } from '../../containers';
import {Footer, LoadingOverlay } from '../index'
import {history} from '../../store/store';
import Routes from "../../routes";
import {getWishlist} from "../../redux/wishlist/wishlist.actions";
import {getBanners} from "../../redux/banners/banners.actions";
import {getCart} from "../../redux/cart/cart.actions";
import { clearLocalStorage } from '../../services/local-storage';

import 'semantic-ui-css/semantic.min.css'

const App = () => {
    const dispatch = useDispatch();
    const {productsLoading, bannersLoading} = useSelector(({Products, Banners}) => ({
        productsLoading: Products.loading,
        bannersLoading: Banners.loading,
    }))

    const [loadingPageVisibility, setLoadingPageVisibility] = useState(true)

    if (!localStorage.getItem('trendyIT')) {
        clearLocalStorage();
    }

    useEffect(() => {
        dispatch(getWishlist())
        dispatch(getCart())
        dispatch(getProducts())
        dispatch(getBanners())
    }, [dispatch])

    useEffect(() => {
        if (!productsLoading && !bannersLoading) {
          setLoadingPageVisibility(false)
       }
    }, [productsLoading, bannersLoading])

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

