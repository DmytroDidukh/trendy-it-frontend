import React from 'react';
import { useSelector } from "react-redux";
import CategoryItem from '../category-item';

import './style.scss';
import { Link } from 'react-router-dom';
import {linkGenerator} from "../../utils";
import {setToLocalStorage} from "../../services/local-storage";


const Categories = () => {

        const categories = useSelector(({ Categories }) => Categories.list);

        return (
                <div className="categories-container">
                        <div className="categories-container__main">
                                {categories.map((cat, idx) => {
                                        if (idx <= 1) {
                                                return (
                                                        <Link className="link" key={cat.id} to={{pathname: linkGenerator(cat), query: cat}}
                                                              onClick={() => setToLocalStorage('currentSubcategory', null)}>
                                                                <CategoryItem content={cat} />
                                                        </Link>
                                                )

                                        }
                                })}
                        </div>
                        <div className="categories-container__sub">
                                {categories.map((cat, idx) => {
                                        if (idx > 1) {
                                                return (
                                                        <Link className="link" key={cat.id} to={{pathname: linkGenerator(cat), query: cat}}>
                                                                <CategoryItem content={cat} />
                                                        </Link>
                                                )
                                        }
                                })}
                        </div>
                </div>
        )
}

export default Categories
