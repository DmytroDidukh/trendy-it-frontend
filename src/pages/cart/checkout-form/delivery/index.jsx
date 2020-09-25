import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Select} from "semantic-ui-react";

import {
    CURRIER_DELIVERY_INPUTS_DATA,
    CURRIER_DELIVERY_SELECT_DATA,
    POST_DELIVERY_SELECT_DATA
} from "../../../../constants/checkout-form.options";
import {
    getNovaPoshtaCities,
    getNovaPoshtaStreets
} from "../../../../redux/novaposhta/novaposhta.actions";

const Delivery = ({
                      deliveryMethod,
                      delivery,
                      setDelivery,
                      address,
                      setAddress,
                      paymentMethod,
                      handleChange,
                      error
                  }) => {

    const {cities, warehouses, streets, deliveryPrice} = useSelector(({Novaposhta}) => ({
        cities: Novaposhta.cities,
        warehouses: Novaposhta.warehouses,
        streets: Novaposhta.streets,
        deliveryPrice: Novaposhta.deliveryPrice || 0,
        loading: Novaposhta.loading,
    }))
    const dispatch = useDispatch()

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
        <div>

            {
                deliveryMethod === 2 && (
                    <>
                        {
                            POST_DELIVERY_SELECT_DATA.map((data, i) => (
                                <Form.Field
                                    key={i}
                                    className={'checkout-selection-dropdown'}
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
                                    className={'checkout-selection-dropdown'}
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

            {!!deliveryPrice && paymentMethod &&
            <div className='delivery-price'>Ціна доставки: {deliveryPrice} UAH</div>}
        </div>
    )
}

export default Delivery
