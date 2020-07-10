import {
  GET_USERS,
  GET_USER,
  CLEAR_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from '../actions/types';

const initialState = {
  users: null,
  user: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case ADD_USER:
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: {
          success: state.users.success,
          count: state.users.count - 1,
          pagination: state.users.pagination,
          data: state.users.data.filter((user) => user._id !== payload),
        },
        loading: false,
      };
    case USER_ERROR:
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
