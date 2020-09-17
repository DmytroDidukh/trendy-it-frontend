import React from "react";
import {Link} from "react-router-dom";

import {linkGenerator, toLowerCase} from '../../../utils'

const SearchBarListItem = ({item}) => {

    const itemGenerator = ({name, category, subcategory,  __typename, price}) => {
        switch (__typename) {
            case 'Category':
                return (
                    <div className='search-item'>
                        <h4>{name}</h4>
                        <span>в категоріях</span>
                    </div>
                )
            case 'Subcategory':
                return (
                    <div className='search-item'>
                        <h4>{name}</h4>
                        <span>в {category.name}</span>
                    </div>
                )
            case 'Product':
                return (
                    <div className='search-item'>
                        <h4>{name}</h4>
                        <span className='price'>{price} UAH</span>
                        <span>в {category.name}, {subcategory.name}</span>
                    </div>
                )
            default:
                return 'someLink'
        }
    }

    return (
        <li>
            <Link to={{pathname: linkGenerator(item), query: item}}>
                {itemGenerator(item)}
            </Link>
        </li>
    )
}

export default SearchBarListItem
