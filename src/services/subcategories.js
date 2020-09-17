import { gql } from 'apollo-boost'

import client from "./index";

export const getSubcategories = () =>
    client.query({
        query: gql`
            {
                getSubcategories {
                    id
                    name                    
                    category {
                        id
                        name         
                       
                    }
                    products {
                        id
                        name                        
                    }
                }
            }
        `
});
