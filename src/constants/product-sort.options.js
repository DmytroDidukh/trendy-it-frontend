const SORT_OPTIONS = {
  options: [
    { key: '-createdAt', text: 'За замовчуванням', value: '-createdAt' },
    { key: 'price', text: 'Спочатку дешевші', value: 'price' },
    { key: '-price', text: 'Спочатку дорожчі', value: '-price' },
    { key: '-hot', text: 'Популярні', value: '-hot' },
    { key: '-new', text: 'Новинки', value: '-new' },
    { key: '-sale', text: 'Розпродаж', value: '-sale' },
    { key: '-available', text: 'В наявності', value: '-available' }
  ],
  name: 'Сортувати за'
};

export default SORT_OPTIONS;
