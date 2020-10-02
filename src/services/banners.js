import { gql } from 'apollo-boost';

import client from './index';

export const getBannersByUsability = async () => {
  return await client.query({
    query: gql`
      {
        getBannerByUsability {
          id
          title
          image {
            url
          }
          description
          toSlider
        }
      }
    `
  });
};
