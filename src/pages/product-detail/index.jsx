import React, {useEffect, useState} from "react";
import {Icon, Popup, Label, Card} from 'semantic-ui-react'
import {useDispatch, useSelector} from "react-redux";

import {addItemToWishlist, removeItemFromWishlist} from "../../redux/wishlist/wishlist.actions";
import {addItemToCart} from "../../redux/cart/cart.actions";
import Breadcrumb from './breadcrumb'
import ImageViewer from './image-viewer'
import Colors from './Colors'
import {Spinner} from "../../components";
import {LABELS_DATA} from "../../constants";

import './style.scss'


const ProductDetailPage = ({productId}) => {
    const dispatch = useDispatch();
    const {wishlistItems, productsList} = useSelector(({Wishlist, Products}) => ({
        wishlistItems: Wishlist.list,
        productsList: Products.list,
    }))

    const [product, setProduct] = useState(null)
    const [isItemInWishlist, setIsItemInWishlist] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const [isColorErrorVisible, setIsColorErrorVisible] = useState(false)

    useEffect(() => {
        if (productsList.length) {
            setProduct(productsList.find(item => item.id === productId))
        }
    }, [productsList.length])

    useEffect(() => {
        if (product) {
            const checkedWishlistItem = wishlistItems.find(item => item.id === product.id)
            checkedWishlistItem && setIsItemInWishlist(true)
        }
    }, [wishlistItems, isItemInWishlist, product])


    const onAddToWishlist = () => {
        if (isItemInWishlist) {
            dispatch(removeItemFromWishlist(product.id))
            setIsItemInWishlist(false)
        } else {
            dispatch(addItemToWishlist(product))
            setIsItemInWishlist(true)
        }
    }

    const onAddToCart = () => {
        if (!selectedColor) {
            setIsColorErrorVisible(true)
            return
        }

        dispatch(addItemToCart({...product, selectedColor, quantity: 1}))
    }

    const labelGenerator = ({color, inner}) => (
        <Label color={color} horizontal>
            {inner}
        </Label>
    )

    const salePercentage = () => Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)

    return (
        <div className='product-detail'>
            {
                product ? (
                    <>
                        <Breadcrumb itemName={product.name}/>
                        <div className='product-detail__labels'>
                            {product.newItem && labelGenerator(LABELS_DATA.newItem)}
                            {product.hot && labelGenerator(LABELS_DATA.hot)}
                            {product.sale && labelGenerator(LABELS_DATA.sale)}
                        </div>
                        <div className='product-detail__item'>
                            <ImageViewer images={product.images.product}/>
                            <div className='product-detail__item__description'>
                                <h1>{product.name}</h1>
                                <div className="product-detail__item__price">
                                    {product.sale && <strike>{product.oldPrice} </strike>}
                                    <span> {product.price}</span> UAH
                                    {product.sale && <Label color='red'>-{salePercentage()} %</Label>}
                                </div>
                                <pre dangerouslySetInnerHTML={{__html: product.description}}/>
                                <Colors colors={product.colors}
                                        selectedColor={selectedColor}
                                        setSelectedColor={setSelectedColor}
                                        isColorErrorVisible={isColorErrorVisible}
                                        setIsColorErrorVisible={setIsColorErrorVisible}/>
                                <div className='to-order'>
                                    <Popup
                                        trigger={<button disabled={!product.available}
                                                         className='basic-button'
                                                         onClick={onAddToCart}>
                                            Купити
                                        </button>}
                                        disabled={!selectedColor}
                                        content='Додано в корзину'
                                        on={['click']}
                                    />
                                    <Icon className={isItemInWishlist ? 'selected' : ''}
                                          name={isItemInWishlist ? 'heart' : 'heart outline'}
                                          onClick={onAddToWishlist}/>
                                </div>
                                {!product.available && <div>Немає в наявності</div>}
                            </div>
                        </div>
                    </>
                ) : (
                    <Spinner/>
                )
            }
        </div>
    )
}

export default ProductDetailPage
