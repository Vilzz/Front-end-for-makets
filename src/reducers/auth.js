import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  PASSWORD_CHANGED,
  ADDRESS_UPDATE,
  PHONE_UPDATE,
  UPDATE_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
    case ADDRESS_UPDATE:
    case PHONE_UPDATE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case PASSWORD_CHANGED:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
