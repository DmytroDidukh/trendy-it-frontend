import React from "react";

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
