import React from "react";
import {Link} from 'react-router-dom'

import './style.scss'

const ThanksPage = () => {
    return (
        <div className='thanks-page'>
            <h2 className='title'>Trendy IT</h2>
            <h2>Дякуємо за покупку!</h2>
            <Link to='/'>
                <button className='basic-button'>На головну</button>
            </Link>
        </div>
    )
}

export default ThanksPage
