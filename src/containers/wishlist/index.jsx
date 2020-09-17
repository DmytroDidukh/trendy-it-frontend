import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Icon, Label, Item, Message} from 'semantic-ui-react'

import {ModalBasic} from '../../components'
import {linkGenerator} from "../../utils";
import './style.scss'
import {removeItemFromWishlist} from "../../redux/wishlist/wishlist.actions";



const Wishlist = () => {
    const wishlistItems = useSelector(({Wishlist}) => Wishlist.list)
    const dispatch = useDispatch();

    const [wishlistVisibility, setWishlistVisibility] = useState(false)

    const onModalAction = (item) => {
        item && dispatch(removeItemFromWishlist(item.id))
    }

    return (
        <div className='wishlist'>
            <div className='wishlist__header'>
                <Icon className='header-icons' name='heart' onClick={() => setWishlistVisibility(!wishlistVisibility)}/>
                {!!wishlistItems.length && <Label circular className='label'>
                    {wishlistItems.length}
                </Label>}
            </div>
            {wishlistVisibility && <Item.Group className={'wishlist__popup'}>
                <Icon name='remove circle' onClick={() => setWishlistVisibility(!wishlistVisibility)}/>
                {
                    wishlistItems.length ?
                        (wishlistItems.map((item) => (
                                <Item key={item.id}>
                                    <a href={`/catalog/${item.id}`}>
                                        <Item.Image size='tiny' src={item.images[0].link}/>
                                    </a>
                                    <Item.Content>
                                        <Item.Header as='a' href={`/catalog/${item.id}`}>{item.name}</Item.Header>
                                        <Item.Extra>
                                            {item.price} UAH
                                        </Item.Extra>
                                        <ModalBasic
                                            msg='Улюблених'
                                            setAction={onModalAction}
                                            item={item}/>
                                    </Item.Content>
                                </Item>
                            ))
                        ) : (
                            <Message>
                                <Message.Header>Список порожній</Message.Header>
                            </Message>)
                }
            </Item.Group>}
        </div>
    )
}

export default Wishlist;
