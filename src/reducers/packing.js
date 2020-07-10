import {
  CREATE_PACKING,
  GET_PACKINGS,
  EDIT_PACKING,
  GET_PACKING,
  PACKING_ERROR,
  CLEAR_PACKING,
  DELETE_PACKING,
} from '../actions/types';

const initialState = {
  packings: null,
  packing: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PACKINGS:
      return {
        ...state,
        packings: payload,
        loading: false,
      };
    case CLEAR_PACKING:
      return {
        ...state,
        packing: null,
        loading: false,
      };
    case CREATE_PACKING:
    case EDIT_PACKING:
    case GET_PACKING:
      return {
        ...state,
        packing: payload,
        loading: false,
      };
    case DELETE_PACKING:
      return {
        ...state,
        packings: {
          success: state.packings.success,
          count: state.packings.count - 1,
          pagination: state.packings.pagination,
          data: state.packings.data.filter((pack) => pack._id !== payload),
        },
      };
    case PACKING_ERROR:
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
