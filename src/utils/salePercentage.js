export default (product) =>  Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
