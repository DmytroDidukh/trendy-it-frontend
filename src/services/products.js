import {gql} from 'apollo-boost'

import client from "./index";

export const getProducts = () => (
client.query({
    query: gql`
        {
            getProducts {
                id
                name
                images {
                    link
                }
                price
                description
                sizes {
                    xs
                    s
                    m
                    l
                    xl
                    xxl
                    oneSize
                }
                rating {
                    value
                }
                createdAt
                subcategory {
                    id
                    name
                }
                category {
                    id
                    name
                }
            }
        }
    `
}));

export const getProductById = async (id) => (
    await client.query({
        variables: {
            id
        },
        query: gql`
            query($id: ID!) {
                getProductById(id: $id) {
                    id
                    name
                    images {
                        link
                    }
                    price
                    description
                    sizes {
                        xs
                        s
                        m
                        l
                        xl
                        xxl
                    }
                    rating {
                        value
                    }
                    createdAt
                    subcategory {
                        id
                        name
                    }
                    category {
                        id
                        name
                    }
                }
            }      
        `
}))

