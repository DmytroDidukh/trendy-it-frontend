export default (key, value) => {
    switch (key) {
        case 'name': {
            return /^[A-Za-zА-Яа-я]{2,50}$/.test(value)
        }
        case 'surname': {
            return /^[A-Za-zА-Яа-я]{2,50}$/.test(value)
        }
        case 'email': {
            return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        }
        case 'phone': {
            return /^\+?\d{10,12}$/.test(value)
        }
        case 'city': {
            return /^[А-Я\w\dі]{2,50}$/i.test(value)
        }
        case 'postOffice': {
            return /^\d{1,5}$/.test(value)
        }
        case 'street': {
            return /^[\d\w\s]{2,50}$/i.test(value)
        }
        case 'built': {
            return /^[\d\w\s]{2,50}$/i.test(value)
        }
        default: {
            return true
        }
    }
}
