import {
  CREATE_BASKET,
  UPDATE_BASKET,
  DELETE_BASKET,
  GET_BASKET,
  GET_BASKETS,
  BASKET_ERROR,
  CLEAR_BASKET,
  CLEAR_BASKETS,
  CHECK_BASKET,
  BASKET_COUNT,
  DELETE_BASKET_ROW,
} from '../actions/types';
const initialState = {
  basket: null,
  baskets: null,
  customerid: null,
  basketcount: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_BASKET_ROW:
      return {
        ...state,
        basket: payload,
        loading: false,
      };
    case BASKET_COUNT:
      return {
        ...state,
        basketcount: payload,
        loading: false,
      };
    case CHECK_BASKET:
      return {
        ...state,
        customerid: payload,
        loading: false,
      };
    case CREATE_BASKET:
      return {
        ...state,
        loading: false,
        basket: payload,
      };
    case DELETE_BASKET:
      return {
        ...state,
        basket: payload,
        loading: false,
      };
    case CLEAR_BASKET:
      return {
        ...state,
        basket: null,
        basketcount: null,
        loading: false,
      };
    case CLEAR_BASKETS:
      return {
        ...state,
        baskets: null,
        loading: false,
      };
    case GET_BASKET:
    case UPDATE_BASKET:
      return {
        ...state,
        basket: payload,
        loading: false,
      };
    case GET_BASKETS:
      return {
        ...state,
        baskets: payload,
        loading: false,
      };
    case BASKET_ERROR:
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
