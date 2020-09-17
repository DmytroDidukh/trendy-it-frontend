export const CUSTOMER_INPUTS_DATA = [
    {
        name: 'surname',
        error: 'Будь ласка, введіть прізвище (від 2 до 30 літер)',
        label: 'Прізвище',
        placeholder: 'Введіть прізвище...'
    },
    {
        name: 'name',
        error: 'Будь ласка, введіть ім‘я (від 2 до 30 літер)',
        label: 'Ім‘я',
        placeholder: 'Введіть ім‘я...'
    },
    {
        name: 'email',
        error: 'Будь ласка, введіть валідну ел. пошту',
        label: 'Ел. пошта',
        placeholder: 'test.mail@email.com'
    },
    {
        name: 'phone',
        error: 'Будь ласка, введіть валідний номер телефону',
        label: 'Телефон',
        placeholder: '0987654321'
    },
]

export const CONNECTION_CHECKBOX_DATA = [
    {label: 'Ел. пошта'},
    {label: 'Телефон'},
    {label: 'Telegram'},
    {label: 'Viber'},
]

export const POST_DELIVERY_INPUTS_DATA = [
    {
        name: 'city',
        error: 'Будь ласка, введіть назуву міста доставки (від 2 до 50 символів)',
        label: 'Місто',
        placeholder: 'Введіть місто доставки...'
    },
    {
        name: 'postOffice',
        error: 'Будь ласка, введіть номер відділення Нової Пошти (від 1 до 5 цифр)',
        label: 'Номер відділення',
        placeholder: 'Введіть номер відділення...'
    },
]

export const CURRIER_DELIVERY_INPUTS_DATA = [
    {
        name: 'city',
        error: 'Будь ласка, введіть назуву міста для доставки (від 2 до 50 символів)',
        label: 'Місто',
        placeholder: 'Введіть місто доставки...'
    },
    {
        name: 'street',
        error: 'Будь ласка, введіть назву вулиці для доставки (від 2 до 50 літер)',
        label: 'Вулиця',
        placeholder: 'Введіть назву вулиці...'
    },
    {
        name: 'built',
        error: 'Будь ласка, введіть номер будинку для доставки (від 1 до 10 символів)',
        label: 'Будинок',
        placeholder: 'Введіть номер будинку...'
    },
    {
        name: 'apartment',
        error: 'Будь ласка, введіть назву квартири для доставки (від 2 до 5 символів)',
        label: 'Вулиця',
        placeholder: 'Введіть номер квартири...'
    },
]

export const DELIVERY_OPTIONS = [
    {key: 1, text: 'самовивіз', value: 1},
    {key: 2, text: 'на відділення Нової Пошти', value: 2},
    {key: 3, text: 'кур‘єром', value: 3},
]

export const CUSTOMER_DEFAULT = {
    name: {value: null, isValid: null},
    surname: {value: null, isValid: null},
    email: {value: null, isValid: null},
    phone: {value: null, isValid: null},
}

export const DELIVERY_DEFAULT = {
    method: {value: null, isValid: null},
    city: {value: null, isValid: null},
    postOffice: {value: null, isValid: null}
}

export const ADDRESS_DEFAULT = {
    city: {value: null, isValid: null},
    street: {value: null, isValid: null},
    built: {value: null, isValid: null},
    apartment: {value: null, isValid: true},
}
