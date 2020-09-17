import React from "react";
import {useSelector} from "react-redux";
import {Icon, Label} from 'semantic-ui-react'
import {Link} from "react-router-dom";

import {SearchBar, Wishlist} from '../../index'

const RightBar = () => {
    const cartItems = useSelector(({Cart}) => Cart.list)

    return (
        <div className='main-header__right-bar'>
            <SearchBar/>
            <Wishlist/>
            <Link to='/cart'>
                <Icon name='cart' className='header-icons'/>
                {!!cartItems.length && <Label circular className='cart-label'>
                    {cartItems.reduce( (sum, item) => sum + item.quantity, 0)}
                </Label>}
            </Link>
        </div>
    )
}

export default RightBar;
