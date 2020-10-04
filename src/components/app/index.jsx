import React, { useEffect, useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { Header } from '../../containers';
import { ErrorBoundary } from '../../pages';
import { Footer, LoadingOverlay } from '../index';
import { history } from '../../store/store';
import Routes from '../../routes';
import { getWishlist } from '../../redux/wishlist/wishlist.actions';
import { getCart } from '../../redux/cart/cart.actions';
import {
  clearLocalStorage,
  getFromLocalStorage
} from '../../services/local-storage';

import 'semantic-ui-css/semantic.min.css';

const defaultTheme =
  getFromLocalStorage('theme') === 'light' ? 'light' : 'dark';
export const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: () => {}
});

const App = () => {
  const dispatch = useDispatch();
  const { productsLoading, bannersLoading } = useSelector(
    ({ Products, Banners }) => ({
      productsLoading: Products.loading,
      bannersLoading: Banners.loading
    })
  );

  const [loadingPageVisibility, setLoadingPageVisibility] = useState(true);

  const [theme, setTheme] = useState(defaultTheme);
  const value = { theme, setTheme };

  if (!localStorage.getItem('trendyIT')) {
    clearLocalStorage();
  }

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (!productsLoading && !bannersLoading) {
      setLoadingPageVisibility(false);
    }
  }, [productsLoading, bannersLoading]);

  return (
    <ConnectedRouter history={history}>
      <ThemeContext.Provider value={value}>
        <LoadingOverlay isVisible={loadingPageVisibility} />
        <ErrorBoundary>
          <Header />
          <Routes />
          <Footer />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </ConnectedRouter>
  );
};

export default App;
