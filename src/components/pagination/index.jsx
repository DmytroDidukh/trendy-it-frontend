import React from 'react';
import { Pagination as BasePagination } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const Pagination = ({ pagination, setQuery }) => {
  const dispatch = useDispatch();

  const onPageChange = (e, { activePage }) => {
    setQuery((query) => ({
      ...query,
      page: +activePage
    }));
    dispatch(push(`/catalog/pages=${activePage}`));
  };

  return (
    <BasePagination
      defaultActivePage={pagination ? pagination.currentPage : 1}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      totalPages={pagination ? pagination.totalPages : 1}
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;
