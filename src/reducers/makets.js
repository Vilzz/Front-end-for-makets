import {
  GET_MAKETS_LIST,
  GET_MAKET,
  CLEAR_MAKET,
  CLEAR_MAKETS,
  MAKETS_ERROR,
  CREATE_MAKET,
  MAKET_ERROR,
  UPDATE_MAKET,
  DELETE_MAKET,
  ADD_IMAGE,
  CLEAR_IMAGES,
  GET_IMAGES,
} from '../actions/types';

const initialState = {
  makets: null,
  maket: null,
  images: null,
  loading: true,
  imgloading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MAKETS_LIST:
      return {
        ...state,
        makets: payload,
        maket: null,
        loading: false,
      };
    case GET_MAKET:
      return {
        ...state,
        maket: payload,
        loading: false,
      };
    case CLEAR_MAKET:
      return {
        ...state,
        maket: null,
        loading: false,
      };
    case CLEAR_MAKETS:
      return {
        ...state,
        makets: null,
        loading: false,
      };
    case CREATE_MAKET:
    case UPDATE_MAKET:
    case ADD_IMAGE:
      return {
        ...state,
        loading: false,
      };
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
        imgloading: false,
      };
    case CLEAR_IMAGES:
      return {
        ...state,
        images: null,
        loading: false,
      };
    case DELETE_MAKET:
      return {
        ...state,
        makets: {
          success: state.makets.success,
          count: state.makets.count - 1,
          pagination: state.makets.pagination,
          data: state.makets.data.filter((maket) => maket._id !== payload),
        },
        loading: false,
      };
    case MAKETS_ERROR:
    case MAKET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return { ...state };
  }
}
