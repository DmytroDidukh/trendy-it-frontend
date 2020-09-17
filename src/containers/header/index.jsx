import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CategoriesList from "./categories-list";
import RightBar from "./right-bar";
import './style.scss'

const Header = () => {
    const categories = useSelector(({ Categories }) => Categories.list);

    return (
        <div className='main-header'>
            <Link to='/'>
                <h1 className='main-header__logo'>Shkaff</h1>
            </Link>
            <CategoriesList list={categories} />
            <RightBar />
        </div>
    )
}

export default Header;
