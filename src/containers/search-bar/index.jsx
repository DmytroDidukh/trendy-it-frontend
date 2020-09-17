import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Icon, Input} from "semantic-ui-react";

import SearchBarListItem from "./search-list-bar-item";
import {toLowerCase} from '../../utils'

import './style.scss'

const SearchBar = () => {
    const {products} = useSelector(({Products}) => ({
        products: Products.list,
    }))

    const [filteredList, setFilteredList] = useState([])
    const [listVisibility, setListVisibility] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchBarVisibility, setSearchBarVisibility] = useState(window.innerWidth >= 772);

    const onSearch = (e) => {
        const {value} = e.target
        const result = []

        if (!value) {
            setListVisibility(false)
            return
        }
        setSearchValue(value)
        setListVisibility(true)

        const inProducts = products.filter(({name}) => toLowerCase(name).includes(toLowerCase(value)))

        result.push(...inProducts)
        setFilteredList(result)
    }

    return (
        <div>
            <Input icon='search'
                   className={`search-bar ${searchBarVisibility && 'visible-bar'}`}
                   placeholder='Пошук...'
                   onChange={onSearch}
                   onFocus={onSearch}
                   onBlur={() => setTimeout(() => setListVisibility(false), 100)}
            />
            <Icon name='search'
                  onClick={() => setSearchBarVisibility(!searchBarVisibility)}
                  className='not-wide-search-icon header-icons'/>
            <ul className={`search-list ${listVisibility && 'visible'}`}>
                {filteredList.length && searchValue ? (
                    filteredList.map(item => (
                        <SearchBarListItem key={item.id} item={item} setListVisibility={setListVisibility}/>
                    ))
                ) : (
                    <h6 className='empty-list'>Пошук не дав результатів</h6>
                )
                }
            </ul>
        </div>
    )
}

export default SearchBar
