import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Input, Loader } from 'semantic-ui-react';

import SearchBarListItem from './search-list-bar-item';

import './style.scss';
import { getSearchedProducts } from '../../redux/products/products.actions';

const SearchBar = () => {
  const { products, loading } = useSelector(({ Products }) => ({
    products: Products.searchedList,
    loading: Products.searchLoading
  }));
  const dispatch = useDispatch();

  const [listVisibility, setListVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);

  const onSearch = (e) => {
    const { value } = e.target;

    if (!value) {
      setListVisibility(false);
      return;
    }

    setSearchValue(value);
    setListVisibility(true);

    dispatch(getSearchedProducts({ filter: { search: value } }));
  };

  return (
    <div>
      <Input
        icon='search'
        className={`search-bar ${searchBarVisibility && 'visible-bar'}`}
        placeholder='Пошук...'
        onChange={onSearch}
        onFocus={onSearch}
        onBlur={() => setTimeout(() => setListVisibility(false), 100)}
      />
      <Icon
        name='search'
        onClick={() => setSearchBarVisibility(!searchBarVisibility)}
        className='not-wide-search-icon header-icons'
      />
      <div className={`search-list ${listVisibility && 'visible'}`}>
        {!loading ? (
          <ul>
            {products.length && searchValue ? (
              products.map((item) => (
                <SearchBarListItem
                  key={item.id}
                  item={item}
                  setListVisibility={setListVisibility}
                />
              ))
            ) : (
              <h6 className='empty-list'>Пошук не дав результатів</h6>
            )}
          </ul>
        ) : (
          <Loader className={'search-loader'} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
