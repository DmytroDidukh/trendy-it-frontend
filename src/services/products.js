import { gql } from 'apollo-boost';

import client from './index';

export const getProducts = async ({ filter, sort, page, limit = 0 }) => {
  const response = await client.query({
    variables: {
      filter,
      sort,
      page,
      limit
    },
    query: gql`
      query($filter: FilterInput, $sort: String, $page: Int, $limit: Int) {
        getProducts(filter: $filter, sort: $sort, page: $page, limit: $limit) {
          products {
            id
            name
            images {
              slider {
                url
                publicId
              }
              product {
                url
                publicId
              }
            }
            color
            price
            oldPrice
            description
            available
            sale
            hot
            newItem
            toSlider
            createdAt
          }
          pagination {
            totalDocs
            currentPage
            totalPages
            hasNextPage
            hasPrevPage
          }
        }
      }
    `
  });

  return response.data.getProducts;
};

export const getProductById = async (id) => {
  const response = await client.query({
    variables: {
      id
    },
    query: gql`
      query($id: ID!) {
        getProductById(id: $id) {
          id
          name
          images {
            slider {
              publicId
              url
            }
            product {
              publicId
              url
            }
          }
          color
          price
          oldPrice
          description
          available
          sale
          hot
          newItem
          toSlider
          createdAt
        }
      }
    `
  });

  return response.data.getProductById;
};
