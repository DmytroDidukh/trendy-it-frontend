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
                    slider
                    product {
                        link
                    }
                }
                colors {
                    black
                    silver
                    white
                    yellow
                    orange
                    red
                    blue
                    green
                    brown
                    purple
                    pink
                }
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
                    slider
                    product {
                        link
                    }
                }
                colors {
                    black
                    silver
                    white
                    yellow
                    orange
                    red
                    blue
                    green
                    brown
                    purple
                    pink
                }
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
}))

