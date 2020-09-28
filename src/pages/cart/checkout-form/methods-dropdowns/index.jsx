import React from "react";
import {Dropdown} from "semantic-ui-react";

import {
    CONNECTION_OPTIONS,
    DELIVERY_OPTIONS, PAYMENT_OPTIONS,
} from "../../../../constants/checkout-form.options";

const MethodsDropdowns = ({
                              deliveryMethod,
                              setDeliveryMethod,
                              delivery,
                              setDelivery,
                              paymentMethod,
                              setPaymentMethod,
                              connectionMethod,
                              setConnectionMethod,
                              error
                          }) => {

    const handleDropdownChange = ({target}, {dataid, value}) => {
        switch (dataid) {
            case 'payment': {
                setPaymentMethod({value, text: target.innerText})
                break
            }
            case 'delivery': {
                setDeliveryMethod(value)
                setDelivery({...delivery, method: {value: target.innerText, isValid: true}})
                break
            }
            case 'connection': {
                setConnectionMethod({value, text: target.innerText})
                break
            }
            default: {
                return
            }
        }
    }

    //DATA FOR RENDER
    const dropdownRenderData = [
        {
            id: 'payment',
            title: 'Спосіб оплати:',
            options: PAYMENT_OPTIONS,
            value: paymentMethod.value,
            placeholder: 'Виберіть спосіб оплати'
        },
        {
            id: 'connection',
            title: 'Спосіб зв‘язку:',
            options: CONNECTION_OPTIONS,
            value: connectionMethod.value,
            placeholder: 'Виберіть спосіб зв‘язку'
        },
        {
            id: 'delivery',
            title: 'Спосіб доставки:',
            options: DELIVERY_OPTIONS,
            value: deliveryMethod,
            placeholder: 'Виберіть спосіб доставки'
        },
    ]

    return (
        <>
            {
                dropdownRenderData.map(({id, title, placeholder, value, options}) => (
                    <div key={id}>
                        <h6 style={{fontSize: '.9em'}}>{title}</h6>
                        <Dropdown
                            dataid={id}
                            className='checkout-dropdown'
                            onChange={handleDropdownChange}
                            options={options}
                            placeholder={placeholder}
                            selection
                            error={error && !value}
                            value={value}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default MethodsDropdowns
