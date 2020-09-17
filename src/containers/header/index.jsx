import React from "react";
import {Link} from "react-router-dom";

import RightBar from "./right-bar";
import './style.scss'

const Header = () => {
    return (
        <div className='main-header'>
            <div className='main-header__logo'>
                <Link to='/'>
                    <img src={'./images/logo.png'} alt={'Shop logo'}/>
                    <h1>Trendy IT</h1>
                </Link>
            </div>
            <div className='main-header__catalog'>
                <Link to='/catalog'>
                    <h3>Каталог</h3>
                </Link>
            </div>
            <RightBar/>
        </div>
    )
}

export default Header;
