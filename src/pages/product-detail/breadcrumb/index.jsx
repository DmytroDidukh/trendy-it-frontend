import React from "react";
import {Breadcrumb as MaterialBreadcrumb} from 'semantic-ui-react'
import {Link} from "react-router-dom";

import {linkGenerator} from "../../../utils";
import {setToLocalStorage} from "../../../services/local-storage";

const Breadcrumb = ({item: {category, subcategory, name}}) => {

    return (
        <MaterialBreadcrumb className='breadcrumb'>
            <Link to={'/'}>
                Головна
            </Link>
            <MaterialBreadcrumb.Divider/>
            <Link to={{pathname: linkGenerator(category), query: category}}
                  onClick={() => setToLocalStorage('currentSubcategory', null)}>
                {category.name}
            </Link>
            <MaterialBreadcrumb.Divider/>
            <Link to={{pathname: linkGenerator(category), query: subcategory}}
            onClick={() => setToLocalStorage('currentSubcategory', subcategory.id)}>
                {subcategory.name}
            </Link>
            <MaterialBreadcrumb.Divider/>
            <MaterialBreadcrumb.Section active>{name}</MaterialBreadcrumb.Section>
        </MaterialBreadcrumb>
    )
}

export default Breadcrumb
