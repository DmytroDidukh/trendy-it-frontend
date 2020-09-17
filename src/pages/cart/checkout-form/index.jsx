import React, { useState} from "react";
import {Checkbox, Form, Dropdown} from 'semantic-ui-react'
import {useSelector, useDispatch} from "react-redux";

import {
    CUSTOMER_INPUTS_DATA,
    CONNECTION_CHECKBOX_DATA,
    CURRIER_DELIVERY_INPUTS_DATA,
    POST_DELIVERY_INPUTS_DATA,
    DELIVERY_OPTIONS,
    CUSTOMER_DEFAULT,
    DELIVERY_DEFAULT,
    ADDRESS_DEFAULT
} from "../../../constants/checkout-form.options";
import {checkoutFieldValidate, orderIdGenerator} from '../../../utils'
import { ModalCheckout} from "../../../components";
import {addOrder} from "../../../redux/order/order.actions";
import './style.scss'


const CheckoutForm = () => {
    const cartItems = useSelector(({Cart}) => Cart.list)
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)

    const [connectionMethod, setConnectionMethod] = useState('')
    const [deliveryMethod, setDeliveryMethod] = useState(null)

    const [customer, setCustomer] = useState(CUSTOMER_DEFAULT)
    const [delivery, setDelivery] = useState(DELIVERY_DEFAULT)
    const [address, setAddress] = useState(ADDRESS_DEFAULT)

    const [order, setOrder] = useState(null)

    const handleConnectionChange = ({target}) => setConnectionMethod(target.innerText)
    const handleDeliveryChange = (e, {value}) => {
        setDeliveryMethod(value)
        setDelivery({...delivery, method: {value: e.target.innerText, isValid: true}})
    }

    const onModalAction = (key) => {
        key && dispatch(addOrder(order))
    }

    const handleOnSubmit = () => {
        const isValidateCustomer = Object.values(customer).every(val => val.isValid)
        const isValidateDelivery = deliveryMethod === 2 ? Object.values(delivery).every(val => val.isValid) : true
        const isValidateAddress = deliveryMethod === 3 ? Object.values(address).every(val => val.isValid) : true

        if (!isValidateCustomer ||
            !isValidateDelivery ||
            !isValidateAddress ||
            !connectionMethod ||
            !deliveryMethod) {
            setError(true)
            return
        }

        const orderToSend = {
            customer: {
                name: customer.name.value,
                surname: customer.surname.value,
                email: customer.email.value,
                phone: customer.phone.value,
            },
            delivery: {
                method: delivery.method.value,
                city: delivery.city.value || address.city.value,
                postOffice: delivery.postOffice.value,
                address: {
                    street: address.street.value,
                    built: address.built.value,
                    apartment: address.apartment.value,
                }
            },
            products: [
                ...cartItems.map( item => ({
                        name: item.name,
                        price: item.price,
                        category: item.category.name,
                        subcategory: item.subcategory.name,
                        quantity: item.quantity,
                        size: item.selectedSize
                    }
                ))
            ],
            orderId: orderIdGenerator(),
            connectionMethod
        }

        setOrder(orderToSend)
        setError(false)
        setModalVisibility(true)
    }

    const handleChange = ({target: {id, name, value}}) => {
        switch (id) {
            case 'customer': {
                setCustomer({
                    ...customer,
                    [name]: {
                        value: value, isValid: checkoutFieldValidate(name, value.trim())
                    }
                })
                return;
            }
            case 'post': {
                setDelivery({
                    ...delivery,
                    [name]: {
                        value: value, isValid: checkoutFieldValidate(name, value.trim())
                    }
                })
                return;
            }
            case 'currier': {
                setAddress({
                    ...address,
                    [name]: {
                        value: value, isValid:
                            checkoutFieldValidate(name, value.trim())
                    }
                })
                return;
            }
        }
    }

    return (
        <Form>

            {
                CUSTOMER_INPUTS_DATA.map((data, i) => (
                    <Form.Input
                        key={i}
                        error={error && !customer[data.name].isValid ? {
                            content: data.error, pointing: 'below'
                        } : null}
                        fluid
                        label={data.label}
                        placeholder={data.placeholder}
                        name={data.name}
                        onChange={handleChange}
                        id='customer'
                    />
                ))
            }


            <Form.Field required className={'checkbox'}>
                Спосіб зв‘язку: <b>{connectionMethod}</b>
                {error && !connectionMethod &&
                <span className={'checkout-error'}>Виберіть спосіб зв‘язку нижче</span>}
            </Form.Field>
            {
                CONNECTION_CHECKBOX_DATA.map((data, i) => (
                    <Form.Field key={i}>
                        <Checkbox
                            radio
                            data-id='connection'
                            label={data.label}
                            name='connectionMethod'
                            checked={connectionMethod === data.label}
                            onChange={handleConnectionChange}
                        />
                    </Form.Field>
                ))
            }


            <Dropdown
                data-id='delivery'
                onChange={handleDeliveryChange}
                options={DELIVERY_OPTIONS}
                placeholder='Виберіть спосіб доставки'
                selection
                value={deliveryMethod}
            />
            {error && !deliveryMethod &&
            <div className={'checkout-error'}>Виберіть спосіб доставки</div>}

            {
                deliveryMethod === 2 && (
                    <>
                        {
                            POST_DELIVERY_INPUTS_DATA.map((data, i) => (
                                <Form.Input
                                    key={i}
                                    error={error && !delivery[data.name].isValid ? {
                                        content: data.error,
                                        pointing: 'below'
                                    } : null}
                                    fluid
                                    label={data.label}
                                    placeholder={data.placeholder}
                                    name={data.name}
                                    onChange={handleChange}
                                    id='post'
                                />
                            ))
                        }
                    </>
                )
            }

            {
                deliveryMethod === 3 && (
                    <>  {
                        CURRIER_DELIVERY_INPUTS_DATA.map((data, i) => (
                            <Form.Input
                                key={i}
                                error={error && !address[data.name].isValid ? {
                                    content: data.error,
                                    pointing: 'below'
                                } : null}
                                fluid
                                label={data.label}
                                placeholder={data.placeholder}
                                name={data.name}
                                onChange={handleChange}
                                id='currier'
                            />
                        ))
                    }
                    </>
                )
            }

            <br/>
            <ModalCheckout
                setAction={onModalAction}
                onSubmit={handleOnSubmit}
                order={order}
                cartItems={cartItems}
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                />
        </Form>
    )
}

export default CheckoutForm;
