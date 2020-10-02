import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Table } from 'react-bootstrap';

import { COLORS_DATA } from '../../constants';

const ModalCheckout = ({
  order,
  cartItems,
  cartTotal,
  deliveryPrice,
  setAction,
  onSubmit,
  modalVisibility,
  setModalVisibility
}) => {
  const handleButtonClick = (e) => {
    setModalVisibility(false);
    e.target.name === 'confirm' ? setAction(true) : setAction(false);
  };

  return (
    <Modal
      closeOnEscape={false}
      closeOnDimmerClick={false}
      onClose={() => setModalVisibility(false)}
      onOpen={onSubmit}
      open={modalVisibility}
      size='small'
      trigger={
        <button
          className='basic-button'
          type='submit'
          disabled={!cartItems.length}
        >
          Готово
        </button>
      }
      id='my-modal'
    >
      {order && (
        <>
          <Modal.Header className='order-header'>
            Замовлення: {order.orderId}
          </Modal.Header>
          <Modal.Content className='order-info'>
            <p>
              Покупець:{' '}
              <span>
                {order.customer.surname}, {order.customer.name}
              </span>
            </p>
            <p>
              Ел. пошта: <span>{order.customer.email}</span>
            </p>
            <p>
              Телефон: <span>{order.customer.phone}</span>
            </p>
            <br />
            <p>
              Метод зв‘язку: <span>{order.connectionMethod}</span>
            </p>
            <p>
              Спосіб доставки: <span>{order.delivery.method}</span>
            </p>
            {order.delivery.method !== 'самовивіз' && (
              <p>
                Адреса:
                {order.delivery.method === 'кур‘єром' && (
                  <span>
                    {' '}
                    {order.delivery.city}, вул. {order.delivery.address.street},
                    буд. {order.delivery.address.built}
                    {order.delivery.address.apartment && (
                      <span>, кв. {order.delivery.address.apartment} </span>
                    )}
                  </span>
                )}
                {order.delivery.method === 'на відділення Нової Пошти' && (
                  <span>
                    {order.delivery.city}, відділення{' '}
                    {order.delivery.postOffice}
                  </span>
                )}
              </p>
            )}
            <hr />
            <Table striped bordered size='sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Товар</th>
                  <th>Колір</th>
                  <th>Кількість</th>
                  <th>Ціна за шт.</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, i) => (
                  <tr key={product.name}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>
                      <span
                        className={'order-color'}
                        style={{
                          backgroundColor: COLORS_DATA[product.color].hex
                        }}
                      />
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className='order-summary'>
              <p>
                Сума товару: <span>{cartTotal} UAH</span>
              </p>
              {!!deliveryPrice && (
                <p>
                  Ціна доставки: <span>{deliveryPrice} UAH</span>
                </p>
              )}
              <p>
                Загалом: <span>{cartTotal + deliveryPrice} UAH</span>
              </p>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <p>Наш менеджер зв‘яжеться з Вами найближчим часом.</p>
            <Button onClick={handleButtonClick} inverted color='red'>
              Відмінити
            </Button>
            <Button onClick={handleButtonClick} name='confirm' positive>
              Підтвердити
            </Button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};

export default ModalCheckout;
