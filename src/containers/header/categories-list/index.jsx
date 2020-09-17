import React from "react";
import {Link} from "react-router-dom";

import {linkGenerator} from "../../../utils";
import {setToLocalStorage} from "../../../services/local-storage";

const CategoriesList = ({list}) => {

    return (
        <ul className='main-header__categories-list'>
            {list.map(category => (
                <li key={category.id}>
                    <Link to={{pathname: linkGenerator(category), query: category}}
                          onClick={() => setToLocalStorage('currentSubcategory', null)}
                    >
                        {category.name}
                    </Link>
                    <ul className='main-header__subcategories-list'>
                        {category.subcategories.map(subcategory => (
                            <li key={subcategory.id} onClick={() => setToLocalStorage('currentSubcategory', subcategory.id)}>
                                <Link to={{pathname: linkGenerator(category), query: subcategory}}>
                                    {subcategory.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

export default CategoriesList;
