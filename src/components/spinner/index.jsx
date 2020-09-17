import React from 'react';

import './style.scss';

const Spinner = () => {
    return (
        <div className='spinner-it'>
            <div className='spinner-it__flag'>
                <span/>
                <span/>
                <span/>
            </div>
            <p>Завантаження...</p>
        </div>
    )
}

export default Spinner
