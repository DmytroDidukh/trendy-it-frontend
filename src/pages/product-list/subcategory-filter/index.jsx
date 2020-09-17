import React from 'react';
import { Button } from 'semantic-ui-react';
import './style.scss';
import SubcategoryBadge from '../../../components/subcategory-badge';
const SubcategoryFilter = ({ subcategories, selected, onSelectSubcategory }) => {

        return (
                <div className="subcategory-filter__container">
                        <SubcategoryBadge
                                onSelectSubcategory={onSelectSubcategory}
                                id={null}
                                name={'Усі'}
                                badgeClassName="subcategory-badge" />
                        {subcategories && subcategories.map((sc) => {
                                if (sc.id === selected) {
                                        return (
                                                <SubcategoryBadge
                                                        key={sc.id}
                                                        id={sc.id}
                                                        onSelectSubcategory={onSelectSubcategory}
                                                        name={sc.name}
                                                        badgeClassName="subcategory-badge-active"
                                                />
                                        )
                                } else {
                                        return (
                                                <SubcategoryBadge
                                                        key={sc.id}
                                                        id={sc.id}
                                                        onSelectSubcategory={onSelectSubcategory}
                                                        name={sc.name}
                                                        badgeClassName="subcategory-badge"
                                                />
                                        )
                                }
                        })}

                </div>
        )
}

export default SubcategoryFilter
