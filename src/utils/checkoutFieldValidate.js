export default (key, value) => {
  switch (key) {
    case 'name': {
      return /^[A-Za-zА-Яа-я\s]{2,50}$/.test(value);
    }
    case 'surname': {
      return /^[A-Za-zА-Яа-я\s]{2,50}$/.test(value);
    }
    case 'email': {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    }
    case 'phone': {
      return /^\+?\d{10,12}$/.test(value);
    }
    case 'city': {
      return /^(.+){2,50}$/i.test(value.split('_')[0]);
      //return /^[А-Я'().,\d\sі-]{2,50}$/i.test(value.split('_')[0])
    }
    case 'postOffice': {
      return /^(.+){2,100}$/i.test(value);
      //return /^[А-Я'"():№,.\d\sі-]{2,50}$/i.test(value)
    }
    case 'street': {
      return /^(.+){2,50}$/i.test(value);
      //return /^[\d\w\s]{2,50}$/i.test(value)
    }
    case 'built': {
      return /^[\d\w\s]{1,20}$/i.test(value);
    }
    default: {
      return true;
    }
  }
};
