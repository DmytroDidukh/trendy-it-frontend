import React, {useEffect, useMemo, useState} from "react";
import {Checkbox, Form, Dropdown, Select} from 'semantic-ui-react'
import {useSelector, useDispatch} from "react-redux";

import {
    CUSTOMER_INPUTS_DATA,
    CONNECTION_CHECKBOX_DATA,
    CURRIER_DELIVERY_INPUTS_DATA,
    CURRIER_DELIVERY_SELECT_DATA,
    POST_DELIVERY_SELECT_DATA,
    DELIVERY_OPTIONS,
    PAYMENT_OPTIONS,
    CUSTOMER_DEFAULT,
    DELIVERY_DEFAULT,
    PAYMENT_DEFAULT,
    ADDRESS_DEFAULT
} from "../../../constants/checkout-form.options";
import {checkoutFieldValidate, orderIdGenerator} from '../../../utils'
import {ModalCheckout} from "../../../components";
import {addOrder} from "../../../redux/order/order.actions";
import {
    getNovaPoshtaCities,
    getNovaPoshtaDeliveryPrice,
    getNovaPoshtaWarehouses,
    getNovaPoshtaStreets
} from "../../../redux/novaposhta/novaposhta.actions";

import './style.scss'

const CheckoutForm = () => {
    const {cartItems, cartTotal, cities, warehouses, streets, deliveryPrice} = useSelector(({Cart, Novaposhta}) => ({
        cartItems: Cart.list,
        cartTotal: Cart.cartTotal,
        cities: Novaposhta.cities,
        warehouses: Novaposhta.warehouses,
        streets: Novaposhta.streets,
        deliveryPrice: Novaposhta.deliveryPrice.cost || 0,
        loading: Novaposhta.loading,
    }))
    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)

    const [connectionMethod, setConnectionMethod] = useState('')
    const [deliveryMethod, setDeliveryMethod] = useState(null)
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
            serviceType
        }
        dispatch(getNovaPoshtaDeliveryPrice(data))
    }, [dispatch, delivery, address, cartItems, deliveryMethod])


    // HANDLERS
    const handleConnectionChange = ({target}) => setConnectionMethod(target.innerText)
    const handleDropdownChange = ({target}, {dataid, value}) => {
        if (dataid === 'payment') {
            setPaymentMethod({value, text: target.innerText})
        } else if (dataid === 'delivery') {
            setDeliveryMethod(value)
            setDelivery({...delivery, method: {value: target.innerText, isValid: true}})
        }
    }

    console.log('payment', paymentMethod)

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
            connectionMethod,
            paymentMethod
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

    const onTypeValueToDeliveryInput = ({target}) => {
        const [cityPostData, warehouseData] = POST_DELIVERY_SELECT_DATA
        const [cityAddressData, streetData] = CURRIER_DELIVERY_SELECT_DATA

        // this all ninja code is for reset input and fail validation
        // valid === true only if user select option from suggested list

        switch (target.id) {
            case cityPostData.searchInput: {
                dispatch(getNovaPoshtaCities(target.value))
                setDelivery({
                    ...delivery,
                    city: {
                        value: '', isValid: false
                    },
                    postOffice: {
                        value: '', isValid: false
                    }
                })
                return
            }
            case warehouseData.searchInput: {
                setDelivery({
                    ...delivery,
                    postOffice: {
                        value: '', isValid: false
                    }
                })
                return
            }
            case cityAddressData.searchInput: {
                dispatch(getNovaPoshtaCities(target.value))
                setAddress({
                    ...address,
                    city: {
                        value: '', isValid: false
                    },
                    street: {
                        value: '', isValid: false
                    }
                })
                return
            }
            case streetData.searchInput: {
                dispatch(getNovaPoshtaStreets({
                    cityRef: address.city.value.split('_')[1],
                    street: target.value
                }))
                setAddress({
                    ...address,
                    street: {
                        value: '', isValid: false
                    }
                })
                return
            }
            default: {
                console.log('YO!')
            }
        }
    }

    // DELIVERY SELECT OPTIONS
    const citiesOptions = useMemo(() => {
        return cities.map(city => ({
            key: city.ref,
            text: city.description,
            value: `${city.description}_${city.ref}`
        }))
    }, [cities])

    const warehousesOptions = useMemo(() => {
        return warehouses.map(warehouse => ({
            key: warehouse.ref,
            text: !delivery.city.value ? '' : warehouse.description,
            value: warehouse.description
        }))
    }, [warehouses, delivery])

    const streetsOptions = useMemo(() => {
        return streets.map(street => ({
            key: street.ref,
            text: !address.city.value ? '' : street.present,
            value: street.present
        }))
    }, [streets, address])

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

            <div className={'checkout-dropdown'}>
                <Dropdown
                    dataid='payment'
                    onChange={handleDropdownChange}
                    options={PAYMENT_OPTIONS}
                    placeholder='Виберіть спосіб оплати'
                    selection
                    value={paymentMethod.value}
                />
                {error && !paymentMethod.value &&
                <div className={'checkout-error'}>Виберіть спосіб оплати</div>}
            </div>

            <div className={'checkout-dropdown'}>
                <Dropdown
                    dataid='delivery'
                    onChange={handleDropdownChange}
                    options={DELIVERY_OPTIONS}
                    placeholder='Виберіть спосіб доставки'
                    selection
                    value={deliveryMethod}
                />
                {error && !deliveryMethod &&
                <div className={'checkout-error'}>Виберіть спосіб доставки</div>}
            </div>

            {
                deliveryMethod === 2 && (
                    <>
                        {
                            POST_DELIVERY_SELECT_DATA.map((data, i) => (
                                <Form.Field
                                    key={i}
                                    control={Select}
                                    options={i === 0 ? citiesOptions : warehousesOptions}
                                    label={{children: data.label.children, htmlFor: data.label.htmlFor}}
                                    placeholder={data.placeholder}
                                    search
                                    searchInput={{id: data.searchInput, onChange: onTypeValueToDeliveryInput}}
                                    error={error && !delivery[data.name].isValid ? {
                                        content: data.error,
                                        pointing: 'below'
                                    } : null}
                                    onChange={handleChange}
                                    noResultsMessage={data.noResultsMessage}
                                    name={data.name}
                                    id='post'
                                    disabled={!delivery.city.value && !!i}
                                />
                            ))
                        }
                    </>
                )
            }

            {
                deliveryMethod === 3 && (
                    <>
                        {
                            CURRIER_DELIVERY_SELECT_DATA.map((data, i) => (
                                <Form.Field
                                    key={i}
                                    control={Select}
                                    options={i === 0 ? citiesOptions : streetsOptions}
                                    label={{children: data.label.children, htmlFor: data.label.htmlFor}}
                                    placeholder={data.placeholder}
                                    search
                                    searchInput={{id: data.searchInput, onChange: onTypeValueToDeliveryInput}}
                                    error={error && !address[data.name].isValid ? {
                                        content: data.error,
                                        pointing: 'below'
                                    } : null}
                                    onChange={handleChange}
                                    noResultsMessage={data.noResultsMessage}
                                    name={data.name}
                                    id='currier'
                                    disabled={!address.city.value && !!i}
                                />
                            ))
                        }

                        {
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

            {!!deliveryPrice && <div className='delivery-price'>Ціна доставки: {deliveryPrice} UAH</div>}

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
