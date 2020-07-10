import {
  GET_ORDERS,
  GET_ORDER,
  CLEAR_ORDER,
  ORDERS_ERROR,
  UPDATE_ORDER,
  CREATE_ORDER,
  CLEAR_ORDERS,
} from '../actions/types';

const initialState = {
  orders: null,
  order: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case CREATE_ORDER:
    case GET_ORDER:
    case UPDATE_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case CLEAR_ORDER:
      return {
        ...state,
        order: null,
        loading: false,
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null,
        loading: false,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
