import React from "react";
import { Pagination as BasePagination } from 'semantic-ui-react'

const Pagination = ({productsFilter, setProductsToShow, setCurrentPage}) => {
    const productsAfterFiltering = productsFilter();

    const onPageChange = (e, data) => {
        let lengthIndex;
        if (data.activePage.toString().includes('.')) {
            lengthIndex = data.activePage.toString().split('.')[0] * 12
        } else  {
            lengthIndex = (data.activePage === 1 || data.activePage === undefined ? 0 : data.activePage - 1) * 12
        }
        if (lengthIndex >= productsAfterFiltering.length) return

        setCurrentPage(lengthIndex)
        setProductsToShow(lengthIndex)
    }

    return (
            <BasePagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={productsAfterFiltering.length / 12}
                onPageChange={onPageChange}
            />
    )
}

export default Pagination
