import React from "react";
import {Link} from "react-router-dom";

import {linkGenerator} from "../../../utils";
import {setToLocalStorage} from "../../../services/local-storage";

const CategoriesList = ({list}) => {

    return (
        <ul className='main-header__categories-list'>
            {list.map(category => (
                <li key={category.id}>
                    {category.name}
                </li>
            ))}
        </ul>
    )
}

export default CategoriesList;
