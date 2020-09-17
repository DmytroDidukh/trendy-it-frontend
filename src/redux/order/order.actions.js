import {
    ADD_ORDER
} from './order.types';

export const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order
});
