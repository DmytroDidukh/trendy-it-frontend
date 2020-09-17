import React, {useEffect, useState} from "react";
import {Icon, Popup} from 'semantic-ui-react'
import {useDispatch, useSelector} from "react-redux";

import {addItemToWishlist, removeItemFromWishlist} from "../../redux/wishlist/wishlist.actions";
import {addItemToCart} from "../../redux/cart/cart.actions";
import Breadcrumb from './breadcrumb'
import ImageViewer from './image-viewer'
import Sizes from './sizes'
import {Spinner} from "../../components";

import './style.scss'

const ProductDetailPage = ({productId}) => {
    const dispatch = useDispatch();
    const {wishlistItems, productsList} = useSelector(({Wishlist, Products}) => ({
        wishlistItems: Wishlist.list,
        productsList: Products.list,
    }))

    const [product, setProduct] = useState(null)
    const [productAvailable, setProductAvailable] = useState(true)
    const [isItemInWishlist, setIsItemInWishlist] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [isSizeErrorVisible, setIsSizeErrorVisible] = useState(false)

    useEffect(() => {
        if (productsList.length) {
            setProduct(productsList.find(item => item.id === productId))
        }
    }, [productsList.length])

    useEffect(() => {
        if (product) {
            const checkedWishlistItem = wishlistItems.find(item => item.id === product.id)
            checkedWishlistItem && setIsItemInWishlist(true)

            const sizes = Object.values(product.sizes);
            sizes.pop()
            setProductAvailable(sizes.some(item => item))
        }
    }, [wishlistItems, isItemInWishlist, product, productAvailable])


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
        if (!selectedSize) {
            setIsSizeErrorVisible(true)
            return
        }

        dispatch(addItemToCart({...product, selectedSize, quantity: 1}))
    }

    return (
        <div className='product-detail'>
            {
                product ? (
                    <>
                        <Breadcrumb item={product}/>
                        <div className='product-detail__item'>
                            <ImageViewer images={product.images}/>
                            <div className='product-detail__item__description'>
                                <h1>{product.name}</h1>
                                <div className={'price'}>{product.price} UAH</div>
                                <pre dangerouslySetInnerHTML={{__html: product.description}}/>
                                <Sizes sizes={product.sizes}
                                       selectedSize={selectedSize}
                                       setSelectedSize={setSelectedSize}
                                       isSizeErrorVisible={isSizeErrorVisible}
                                       setIsSizeErrorVisible={setIsSizeErrorVisible}/>
                                <div className='to-order'>
                                    <Popup
                                        trigger={<button disabled={!productAvailable}
                                                         className='basic-button'
                                                         onClick={onAddToCart}>
                                            Купити
                                        </button>}
                                        disabled={!selectedSize}
                                        content='Додано в корзину'
                                        on={['click']}
                                    />
                                    <Icon className={isItemInWishlist ? 'selected' : ''}
                                          name={isItemInWishlist ? 'heart' : 'heart outline'}
                                          onClick={onAddToWishlist}/>
                                </div>
                                {!productAvailable && <div>Немає в наявності</div>}
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
