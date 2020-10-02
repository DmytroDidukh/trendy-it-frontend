import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from 'semantic-ui-react';

import CartItem from './cart-item';
import CheckoutForm from './checkout-form';
import './style.scss';

const Cart = () => {
  const { list: cartItems, cartTotal } = useSelector(({ Cart }) => Cart);

  return (
    <div className='cart'>
      <div className='cart__table'>
        <h2 className='cart__table__title'>
          Кошик ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </h2>
        {cartItems.length ? (
          <>
            <div className='cart__table__items'>
              {cartItems.map((item) => (
                <CartItem key={Math.random()} product={item} />
              ))}
            </div>
            <div className='cart__table__total'>СУМА: {cartTotal} UAH</div>
          </>
        ) : (
          <Message>
            <Message.Header>Список порожній</Message.Header>
          </Message>
        )}
      </div>
      <div className='cart__checkout'>
        <h2 className='cart__checkout__title'>Оформити замовлення</h2>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Cart;
