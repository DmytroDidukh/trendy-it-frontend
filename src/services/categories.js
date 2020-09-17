import { gql } from 'apollo-boost'

import client from "./index";

export const getCategories = () =>
    client.query({
        query: gql`
            {
                getCategories {
                    id
                    name
                    image
                    subcategories {
                        id
                        name               
                    }             
                }
            }
        `
});
