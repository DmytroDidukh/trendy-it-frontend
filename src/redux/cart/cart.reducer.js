import { SET_CART } from './cart.types';

const initialState = {
  list: [],
  cartTotal: 0
};

const cartReducer = (state = initialState, { type, payload }) => {
  if (type === SET_CART) {
    return {
      list: payload,
      cartTotal: payload.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      )
    };
  }
  return state;
};

export default cartReducer;
