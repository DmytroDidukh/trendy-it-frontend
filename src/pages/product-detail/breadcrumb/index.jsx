import React from "react";
import {Breadcrumb as MaterialBreadcrumb} from 'semantic-ui-react'
import {Link} from "react-router-dom";

const Breadcrumb = ({itemName}) => {

    return (
        <MaterialBreadcrumb className='breadcrumb'>
            <Link to={'/'}>
                Головна
            </Link>
            <MaterialBreadcrumb.Divider/>
            <Link to='/catalog'>
                Каталог
            </Link>
            <MaterialBreadcrumb.Divider/>
            <MaterialBreadcrumb.Section active>{itemName}</MaterialBreadcrumb.Section>
        </MaterialBreadcrumb>
    )
}

export default Breadcrumb
