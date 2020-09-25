import React, {useEffect, useState} from "react";
import {Form} from 'semantic-ui-react'
import {useSelector, useDispatch} from "react-redux";

import {
    CUSTOMER_INPUTS_DATA,
    CUSTOMER_DEFAULT,
    DELIVERY_DEFAULT,
    PAYMENT_DEFAULT,
    CONNECTION_DEFAULT,
    ADDRESS_DEFAULT
} from "../../../constants/checkout-form.options";
import {checkoutFieldValidate, orderIdGenerator} from '../../../utils'
import {ModalCheckout} from "../../../components";
import Delivery from "./delivery";
import MethodsDropdowns from "./methods-dropdowns";
import {addOrder} from "../../../redux/order/order.actions";
import {
    getNovaPoshtaCities,
    getNovaPoshtaDeliveryPrice,
    getNovaPoshtaWarehouses,
} from "../../../redux/novaposhta/novaposhta.actions";

import './style.scss'

const CheckoutForm = () => {
    const {cartItems, cartTotal, deliveryPrice} = useSelector(({Cart, Novaposhta}) => ({
        cartItems: Cart.list,
        cartTotal: Cart.cartTotal,
        deliveryPrice: Novaposhta.deliveryPrice || 0,
    }))
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)

    const [deliveryMethod, setDeliveryMethod] = useState(null)

    const [connectionMethod, setConnectionMethod] = useState(CONNECTION_DEFAULT)
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_DEFAULT)

    const [customer, setCustomer] = useState(CUSTOMER_DEFAULT)
    const [delivery, setDelivery] = useState(DELIVERY_DEFAULT)
    const [address, setAddress] = useState(ADDRESS_DEFAULT)

    const [order, setOrder] = useState(null)

    useEffect(() => {
        dispatch(getNovaPoshtaCities('а'))
    }, [dispatch])

    useEffect(() => {
        const {city, postOffice} = delivery;
        const {city: cityAddress} = address;
        const {value: payment} = paymentMethod;

        let serviceType = '';
        let cityRefToSend = ''

        switch (deliveryMethod) {
            case 2: {
                if (city.value && postOffice.value) {
                    cityRefToSend = city.value
                    serviceType = 'WarehouseWarehouse'
                } else return;
                break
            }
            case 3: {
                if (cityAddress.value) {
                    cityRefToSend = cityAddress.value
                    serviceType = 'WarehouseDoors'
                } else return;
                break
            }
            default: {
                return
            }
        }

        const data = {
            cityRecipient: cityRefToSend.split('_')[1],
            cost: cartTotal,
            redeliveryAmount: payment === 1 ? cartTotal : 0,
            serviceType
        }
        dispatch(getNovaPoshtaDeliveryPrice(data))
    }, [dispatch, delivery, address, cartItems, deliveryMethod, paymentMethod.value])


    // HANDLERS
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
            !deliveryMethod ||
            !paymentMethod.value) {
            setError(true)
            return
        }

        const cityToSend = deliveryMethod === 2 ? delivery.city.value.split('_')[0] :
            deliveryMethod === 3 ? address.city.value.split('_')[0] :
                null

        const orderToSend = {
            customer: {
                name: customer.name.value,
                surname: customer.surname.value,
                email: customer.email.value,
                phone: customer.phone.value,
            },
            delivery: {
                method: delivery.method.value,
                city: cityToSend,
                postOffice: delivery.postOffice.value,
                address: {
                    street: address.street.value,
                    built: address.built.value,
                    apartment: address.apartment.value,
                }
            },
            products: [
                ...cartItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        color: item.selectedColor
                    }
                ))
            ],
            orderId: orderIdGenerator(),
            paymentMethod: paymentMethod.text,
            connectionMethod: connectionMethod.text,
            deliveryPrice,
        }

        setOrder(orderToSend)
        setError(false)
        setModalVisibility(true)
    }

    const handleChange = (_, el) => {
        let {id, name, value} = el

        if (name === 'city' && deliveryMethod === 2) {
            const [city, cityRef] = value.split('_')
            dispatch(getNovaPoshtaWarehouses({city, cityRef}))
        }

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
            default: {
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

            <MethodsDropdowns
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                delivery={delivery}
                setDelivery={setDelivery}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                connectionMethod={connectionMethod}
                setConnectionMethod={setConnectionMethod}
                error={error}
            />

            <Delivery
                deliveryMethod={deliveryMethod}
                delivery={delivery}
                setDelivery={setDelivery}
                address={address}
                setAddress={setAddress}
                paymentMethod={paymentMethod.value}
                error={error}
                handleChange={handleChange}
            />

            <br/>
            <ModalCheckout
                setAction={onModalAction}
                onSubmit={handleOnSubmit}
                order={order}
                cartItems={cartItems}
                cartTotal={cartTotal}
                deliveryPrice={deliveryPrice}
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
            />
        </Form>
    )
}

export default CheckoutForm;
