import { gql } from 'apollo-boost';

import client from './index';

export const getProducts = async () => {
  return await client.query({
    query: gql`
      {
        getProducts {
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
          colors
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
};

export const getProductById = async (id) => {
  return await client.query({
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
          colors
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
};
