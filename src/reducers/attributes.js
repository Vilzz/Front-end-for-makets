import {
  GET_ATTRIBUTES,
  ATTRIBUTES_ERROR,
  CLEAR_ATTRIBUTES,
  DELETE_ATTRIBUTE,
  CREATE_ATTRIBUTES,
  ADD_ATTRIBUTE,
} from '../actions/types';

const initialState = {
  attributes: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ATTRIBUTES:
    case DELETE_ATTRIBUTE:
    case CREATE_ATTRIBUTES:
    case ADD_ATTRIBUTE:
      return {
        ...state,
        attributes: payload,
        loading: false,
      };
    case ATTRIBUTES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ATTRIBUTES:
      return {
        ...state,
        attributes: null,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
}
