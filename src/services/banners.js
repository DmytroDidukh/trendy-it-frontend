import { gql } from 'apollo-boost'

import client from "./index";

export const getBannersByUsability = () =>
    client.query({
        query: gql`
            {
                getBannerByUsability {
                    id
                    title
                    image
                    description            
                }
            }
        `
});
