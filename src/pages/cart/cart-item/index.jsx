import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from 'react-router-dom'
import {Accordion, Icon} from 'semantic-ui-react'

import {ModalBasic, NumberInput} from '../../../components'
import {removeItemFromCart, setCartItemQuantity} from '../../../redux/cart/cart.actions'
import {COLORS_DATA} from "../../../constants";
import './style.scss'


const CartItem = ({item}) => {
    const dispatch = useDispatch()

    const [descriptionVisibility, setDescriptionVisibility] = useState(false)

    const onChangeQuantity = (value, key) => {
        dispatch(setCartItemQuantity(item, +value, key));
    };

    const onModalAction = (item) => {
        item && dispatch(removeItemFromCart(item))
    }

    return (
        <div className='cart-item'>
            <ModalBasic
                msg='Кошика'
                setAction={onModalAction}
                item={item}/>
            <div className='cart-item__image'>
                <Link to={`/catalog/${item.id}`}>
                    <img src={item.images.product[0].link} alt={item.name}/>
                </Link>
            </div>
            <div className='cart-item__details'>
                <Link to={`/catalog/${item.id}`}>
                    <h4>{item.name}</h4>
                </Link>
                <div className='cart-item__price'>{item.price} UAH</div>

                <Accordion>
                    <Accordion.Title
                        active={descriptionVisibility}
                        index={0}
                        onClick={() => setDescriptionVisibility(!descriptionVisibility)}
                    >
                        <Icon name='dropdown'/>
                        Опис:
                    </Accordion.Title>
                    <Accordion.Content active={descriptionVisibility}>
                        <pre dangerouslySetInnerHTML={{__html: item.description}}/>
                    </Accordion.Content>
                </Accordion>

                <div className='cart-item__additions'>
                    <div>
                        <div className='cart-item__color-label'>Колір:
                            <span style={{backgroundColor: COLORS_DATA[item.selectedColor].hex}}/>

                        </div>
                        <NumberInput
                            quantity={item.quantity}
                            onChangeQuantity={onChangeQuantity}/>
                    </div>
                    <div>
                        {item.quantity * item.price} UAH
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
