import { gql } from 'apollo-boost'

import client from "./index";

export const getBannersByUsability = async () =>
    await client.query({
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
