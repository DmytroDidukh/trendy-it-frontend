import React, {useEffect, useState} from 'react'
import {Card, Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

import {linkGenerator} from "../../../utils";
import './style.scss';

const ProductCard = ({product}) => {
    const [rating, setRating] = useState(10);
    const [productAvailable, setProductAvailable] = useState(true)


    useEffect(() => {

        if (product && product.rating.length > 0) {
            setRating(product.rating.reduce((a, b) => a + b.value, 0) / product.rating.length);

            const sizes = Object.values(product.sizes);
            sizes.pop()
            setProductAvailable(sizes.some(item => item))
        }
    }, [product, productAvailable])

    return (
        <Link className="ui card product-card" to={{pathname: linkGenerator(product), query: product}}>
            <Image src={product.images[0].link} wrapped ui={false}/>
            <Card.Content>
                <div className="product-card__name">
                    {product.name}
                </div>

                <div className="rating-bar">
                    <div className="rating-bar__text">Рейтинг:</div>
                    <div className="rating-bar__rate">{`${rating.toFixed(0)}/10`}</div>
                </div>
            </Card.Content>
            <Card.Content extra>
                <div className="product-card__price">
                    {`Ціна: ${product.price} грн.`}
                </div>
                {!productAvailable && <div>Немає в наявності</div>}
            </Card.Content>
        </Link>
    )
}

export default ProductCard
