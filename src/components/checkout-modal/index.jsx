import React from 'react'
import {Button, Modal} from 'semantic-ui-react'

const ModalCheckout = ({order, cartItems, setAction, onSubmit, modalVisibility, setModalVisibility}) => {

    const handleButtonClick = (e) => {
        setModalVisibility(false)
        e.target.name === 'confirm' ? setAction(true) : setAction(false)
    }

    return (
        <Modal
            closeOnEscape={false}
            closeOnDimmerClick={false}
            onClose={() => setModalVisibility(false)}
            onOpen={onSubmit}
            open={modalVisibility}
            size='small'
            trigger={<button
                className='basic-button'
                type='submit'
                disabled={!cartItems.length}
            >Готово</button>}
            className='remove-modal'
        >
            {order &&
            <>
                <Modal.Header className='order-header'>Замовлення: {order.orderId}</Modal.Header>
                <Modal.Content className='order-info'>
                    <p>Покупець: <span>{order.customer.surname}, {order.customer.name}</span></p>
                    <p>Ел. пошта: <span>{order.customer.email}</span></p>
                    <p>Телефон: <span>{order.customer.phone}</span></p>
                    <br/>
                    <p>Метод зв‘язку: <span>{order.connectionMethod}</span></p>
                    <p>Спосіб доставки: <span>{order.delivery.method}</span></p>
                    {
                        order.delivery.method !== 'самовивіз' &&
                        <p>Адреса:
                            {
                                order.delivery.method === 'кур‘єром' &&
                                <span> {order.delivery.city},
                                        вул. {order.delivery.address.street},
                                        буд. {order.delivery.address.built}
                                    {order.delivery.address.apartment &&
                                    <span>, кв. {order.delivery.address.apartment} </span>}
                                   </span>

                            }
                            {
                                order.delivery.method === 'на відділення Нової Пошти' &&
                                <span>{order.delivery.city}, відділення {order.delivery.postOffice}</span>

                            }
                        </p>
                    }
                    <p>Сума: <span>{order.products.reduce((sum, item) => sum + item.quantity * item.price, 0)} UAH</span></p>
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
            }
        </Modal>
    )
}


export default ModalCheckout
