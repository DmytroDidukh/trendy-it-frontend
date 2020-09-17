import React from "react";
import {useSelector} from "react-redux";

import './style.scss'

const Banners = () => {
    const {banners} = useSelector(({Banners}) => ({
        banners: Banners.list,
    }))

    return (
        <div className='banners'>
            {
                banners.map(banner => (
                    <div style={{
                        background: `url(${banner.image}) no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                         key={banner.id}
                         className='banners__item'
                    >
                        <div className='banners__content'>
                            <h2>{banner.title}</h2>
                            <p>{banner.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Banners
