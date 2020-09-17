import React, {useState} from "react";
import { Pagination as BasePagination } from 'semantic-ui-react'

const Pagination = ({productsFilter, productsToShow, setCurrentPage}) => {
    const itemsLength = productsFilter().length;

    const onPageChange = (e, data) => {
        let length;
        if (data.activePage.toString().includes('.')) {
            length = data.activePage.toString().split('.')[0] * 12
        } else  {
            length = (data.activePage === 1 || data.activePage === undefined ? 0 : data.activePage - 1) * 12
        }
        if (length >= productsFilter().length) return

        setCurrentPage(length)
        productsToShow(length)
    }

    return (
            <BasePagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={itemsLength / 12}
                onPageChange={onPageChange}
            />
    )
}

export default Pagination
