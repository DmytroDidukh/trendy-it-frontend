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
  }
];

export const CONNECTION_CHECKBOX_DATA = [
  { label: 'Ел. пошта' },
  { label: 'Телефон' },
  { label: 'Telegram' },
  { label: 'Viber' }
];

export const POST_DELIVERY_SELECT_DATA = [
  {
    name: 'city',
    error: 'Будь ласка, виберіть місто зі списку',
    label: {
      children: 'Місто',
      htmlFor: 'control-post-city'
    },
    placeholder: 'Виберіть місто...',
    searchInput: 'control-post-city',
    noResultsMessage: 'Місто не знайдено'
  },
  {
    name: 'postOffice',
    error: 'Будь ласка, виберіть відділення зі списку',
    label: {
      children: 'Відділення',
      htmlFor: 'control-post-warehouse'
    },
    placeholder: 'Виберіть відділення...',
    searchInput: 'control-post-warehouse',
    noResultsMessage: 'Відділення не знайдено'
  }
];

export const CURRIER_DELIVERY_SELECT_DATA = [
  {
    name: 'city',
    error: 'Будь ласка, виберіть місто зі списку',
    label: {
      children: 'Місто',
      htmlFor: 'control-address-city'
    },
    placeholder: 'Виберіть місто...',
    searchInput: 'control-address-city',
    noResultsMessage: 'Місто не знайдено'
  },
  {
    name: 'street',
    error: 'Будь ласка, виберіть вулицю зі списку',
    label: {
      children: 'Вулиця',
      htmlFor: 'control-address-street'
    },
    placeholder: 'Виберіть вулицю...',
    searchInput: 'control-address-street',
    noResultsMessage: 'Вулицю не знайдено'
  }
];

export const CURRIER_DELIVERY_INPUTS_DATA = [
  {
    name: 'built',
    error:
      'Будь ласка, введіть номер будинку для доставки (від 1 до 10 символів)',
    label: 'Будинок',
    placeholder: 'Введіть номер будинку...'
  },
  {
    name: 'apartment',
    error:
      'Будь ласка, введіть назву квартири для доставки (від 2 до 5 символів)',
    label: 'Квартира',
    placeholder: 'Введіть номер квартири...'
  }
];

export const DELIVERY_OPTIONS = [
  { key: 1, text: 'самовивіз', value: 1 },
  { key: 2, text: 'на відділення Нової Пошти', value: 2 },
  { key: 3, text: 'кур‘єром', value: 3 }
];

export const PAYMENT_OPTIONS = [
  { key: 1, text: 'готівкою', value: 1 },
  { key: 2, text: 'на банківську картку', value: 2 }
];

export const CONNECTION_OPTIONS = [
  { key: 1, text: 'телефон', value: 1 },
  { key: 2, text: 'ел. пошта', value: 2 },
  { key: 3, text: 'telegram', value: 3 },
  { key: 4, text: 'viber', value: 4 }
];

export const CUSTOMER_DEFAULT = {
  name: { value: null, isValid: null },
  surname: { value: null, isValid: null },
  email: { value: null, isValid: null },
  phone: { value: null, isValid: null }
};

export const DELIVERY_DEFAULT = {
  method: { value: null, isValid: null },
  city: { value: null, isValid: null },
  postOffice: { value: null, isValid: null }
};

export const PAYMENT_DEFAULT = {
  value: null,
  text: ''
};

export const CONNECTION_DEFAULT = {
  value: null,
  text: ''
};

export const ADDRESS_DEFAULT = {
  city: { value: null, isValid: null },
  street: { value: null, isValid: null },
  built: { value: null, isValid: null },
  apartment: { value: null, isValid: true }
};
