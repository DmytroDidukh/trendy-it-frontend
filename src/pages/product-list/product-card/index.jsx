import React from 'react'
import {Card, Image, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

import {LABELS_DATA} from "../../../constants";
import {salePercentage} from '../../../utils'
import './style.scss';

const ProductCard = ({product}) => {


    const labelGenerator = ({color, inner}) => (
        <Label color={color} ribbon>
            {inner}
        </Label>
    )

    return (
        <Link className="ui card product-card" to={`/catalog/${product.id}`}>
            <div className={'product-card__label-container'}>
                {product.newItem && labelGenerator(LABELS_DATA.newItem)}
                {product.hot && labelGenerator(LABELS_DATA.hot)}
                {product.sale && labelGenerator(LABELS_DATA.sale)}
            </div>
            <Image src={product.images.product[0].url} wrapped ui={false}/>
            <Card.Content>
                <div className="product-card__name product-main-title">
                    {product.name}
                </div>
            </Card.Content>
            <Card.Content extra>
                <div className="product-card__price">
                    {product.sale && <strike>{product.oldPrice} </strike>}
                    <span> {product.price} </span> UAH
                    {product.sale && <Label color='red'>-{salePercentage(product)} %</Label>}
                    {!product.available && <div className='not-available'>Немає в наявності</div>}
                </div>
            </Card.Content>
        </Link>
    )
}

export default ProductCard
