import React from "react";
import {Link} from "react-router-dom";

const SearchBarListItem = ({item: {id, price, name}}) => {

    return (
        <li>
            <Link to={`/catalog/${id}`}>
                <div className='search-item'>
                    <h4>{name}</h4>
                    <span className='price'>{price} UAH</span>
                </div>
            </Link>
        </li>
    )
}

export default SearchBarListItem
