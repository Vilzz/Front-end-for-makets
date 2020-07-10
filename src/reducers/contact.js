import { GET_CONTACT, UPDATE_CONTACT, CONTACT_ERROR } from '../actions/types';

const initialState = {
  contact: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACT:
    case UPDATE_CONTACT:
      return {
        ...state,
        loading: false,
        contact: payload,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
