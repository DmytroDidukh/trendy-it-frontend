import {gql} from 'apollo-boost'

import client from "./index";

export const addOrder = async (order) => {
    await client.mutate({
        variables: {
            order
        },
        mutation: gql`
            mutation($order: OrderInput!) {
                addOrder(order: $order) {
                   orderId
                }
            }
        `
    })
    await client.resetStore();
};
