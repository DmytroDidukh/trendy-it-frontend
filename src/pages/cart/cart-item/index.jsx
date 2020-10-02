import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Label } from 'semantic-ui-react';

import { ModalBasic, NumberInput } from '../../../components';
import {
  removeItemFromCart,
  setCartItemQuantity
} from '../../../redux/cart/cart.actions';
import { COLORS_DATA } from '../../../constants';
import './style.scss';
import { salePercentage } from '../../../utils';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const [descriptionVisibility, setDescriptionVisibility] = useState(false);

  const onChangeQuantity = (value, key) => {
    dispatch(setCartItemQuantity(product, +value, key));
  };

  const onModalAction = (item) => {
    item && dispatch(removeItemFromCart(item));
  };

  return (
    <div className='cart-item'>
      <ModalBasic msg='Кошика' setAction={onModalAction} item={product} />
      <div className='cart-item__image'>
        <Link to={`/product/${product.id}`}>
          <img src={product.images.product[0].url} alt={product.name} />
        </Link>
      </div>
      <div className='cart-item__details'>
        <Link to={`/product/${product.id}`}>
          <h4>{product.name}</h4>
        </Link>
        <div className='cart-item__price'>
          {product.sale && <strike>{product.oldPrice} </strike>}
          {product.price} UAH
          {product.sale && (
            <Label color='red'>-{salePercentage(product)} %</Label>
          )}
        </div>

        <Accordion>
          <Accordion.Title
            active={descriptionVisibility}
            index={0}
            onClick={() => setDescriptionVisibility(!descriptionVisibility)}
          >
            <Icon name='dropdown' />
            Опис:
          </Accordion.Title>
          <Accordion.Content active={descriptionVisibility}>
            <pre dangerouslySetInnerHTML={{ __html: product.description }} />
          </Accordion.Content>
        </Accordion>

        <div className='cart-item__additions'>
          <div>
            <div className='cart-item__color-label'>
              Колір:
              <span
                style={{
                  backgroundColor: COLORS_DATA[product.selectedColor].hex
                }}
              />
            </div>
            <NumberInput
              quantity={product.quantity}
              onChangeQuantity={onChangeQuantity}
            />
          </div>
          <div>{product.quantity * product.price} UAH</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
