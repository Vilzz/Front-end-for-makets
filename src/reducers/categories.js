import {
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY,
  CLEAR_CATEGORY,
  DELETE_CATEGORY,
  CLEAR_CATEGORIES,
} from '../actions/types';

const initialState = {
  categories: null,
  category: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CREATE_CATEGORY:
    case UPDATE_CATEGORY:
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: {
          success: state.categories.success,
          count: state.categories.count - 1,
          pagination: state.categories.pagination,
          data: state.categories.data.filter(
            (category) => category._id !== payload
          ),
        },
        loading: false,
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: null,
        loading: false,
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
        loading: false,
      };
    case CATEGORIES_ERROR:
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
