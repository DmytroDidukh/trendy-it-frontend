import {toLowerCase} from "./index";

export default ({id, name, category, subcategory, __typename}) => {
    switch (__typename) {
        case 'Category':
            return `/${toLowerCase(name)}`
        case 'Subcategory':
            return `/${toLowerCase(category.name)}`
        case 'Product':
            return `/${toLowerCase(category.name)}/${toLowerCase(subcategory.name)}/${id}`
        default:
            return 'someLink'
    }
}
