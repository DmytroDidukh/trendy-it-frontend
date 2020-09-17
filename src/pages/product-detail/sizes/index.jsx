import React from 'react';

import './style.scss'

const Sizes = ({sizes, selectedSize, setSelectedSize, isSizeErrorVisible, setIsSizeErrorVisible}) => {
    const sizesArray = Object.keys(sizes);
    sizesArray.pop()

    const handleClick = (e, value) => {
        setSelectedSize(value.toUpperCase())
        setIsSizeErrorVisible(false)
    }

    return (
        <div className={'sizes'}>
                {
                    sizesArray.map(value => (
                        <button onClick={(e) => handleClick(e, value)}
                                key={value}
                                disabled={!sizes[value] || selectedSize && selectedSize.toLowerCase() === value}
                                className={selectedSize && selectedSize.toLowerCase() === value ? 'sizes__selected' : ''}>
                            {value === 'oneSize' ? 'Без розміру' : value.toUpperCase()}
                        </button>
                    ))
                }
            {isSizeErrorVisible && <div className='sizes__error'>Виберіть розмір</div>}
        </div>
    );
};

export default Sizes;
