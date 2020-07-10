import axios from 'axios';
import { setAlert } from './alert';
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
} from './types';

export const getBaskets = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/basket');
    dispatch({
      type: GET_BASKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const checkBasket = (customerid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/basket/check/${customerid}`);
    const { data } = res;

    dispatch({
      type: CHECK_BASKET,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const basketCount = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/basket/count/${id}`);
    dispatch({
      type: BASKET_COUNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBasket = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/basket/${id}`);

    dispatch({
      type: GET_BASKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearBasket = () => (dispatch) => {
  dispatch({ type: CLEAR_BASKET });
};
export const clearBaskets = () => (dispatch) => {
  dispatch({ type: CLEAR_BASKETS });
};

export const createBasket = (basketData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/v1/basket', basketData, config);
    dispatch({
      type: CREATE_BASKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const updateBasket = (basketData, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/v1/basket/${id}`, basketData, config);
    dispatch({
      type: UPDATE_BASKET,
      payload: res.data,
    });
    dispatch(basketCount(id));
    dispatch(setAlert('Макет добавлен в корзину!', 'success', 1000));
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteBasketRow = (basketid, rowid) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    id: rowid,
  };
  if (window.confirm('Удалить макет из корзины?')) {
    try {
      const res = await axios.put(
        `/api/v1/basket/row/${basketid}`,
        body,
        config
      );
      dispatch({
        type: DELETE_BASKET_ROW,
        payload: res.data,
      });
      dispatch(basketCount(basketid));
      dispatch(setAlert('Макет удален!', 'success', 1000));
    } catch (err) {
      dispatch({
        type: BASKET_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

export const deleteBasket = (id, history) => async (dispatch) => {
  if (window.confirm('Очистить корзину?')) {
    try {
      const res = await axios.delete(`/api/v1/basket/${id}`);
      dispatch({
        type: DELETE_BASKET,
        payload: res.data,
      });
      dispatch(basketCount(id));
      dispatch(setAlert('Корзина удалена', 'danger', 1000));
      history.push('/portfolio');
    } catch (err) {
      dispatch({
        type: BASKET_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

export const deleteBasketOnLogout = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/basket/${id}`);
    dispatch({
      type: DELETE_BASKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BASKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
