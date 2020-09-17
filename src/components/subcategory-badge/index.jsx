import React from 'react';
import './style.scss';

const SubcategoryBadge = ({ badgeClassName, name, onSelectSubcategory, id }) => {
        return (
                <div
                        onClick={() => onSelectSubcategory(id)}
                        className={badgeClassName}>
                        {name}
                </div>
        )
}

export default SubcategoryBadge
