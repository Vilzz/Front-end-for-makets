import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ORDERS,
  GET_ORDER,
  CLEAR_ORDER,
  ORDERS_ERROR,
  UPDATE_ORDER,
  CREATE_ORDER,
  CLEAR_ORDERS,
} from './types';
import { deleteBasketOnLogout, clearBasket, basketCount } from './basket';

export const createOrder = (orderData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const {
    customerid,
    customeremail,
    customername,
    orderdate,
    comment,
    total,
    items,
  } = orderData;

  try {
    const res = await axios.post(
      '/api/v1/orders',
      {
        customerid,
        customeremail,
        customername,
        orderdate,
        comment,
        total,
        items,
      },
      config
    );
    dispatch({
      type: CREATE_ORDER,
      payload: res.data,
    });
    await dispatch(deleteBasketOnLogout(orderData.basketId));
    dispatch(clearBasket);
    dispatch(basketCount(orderData.basketId));
    dispatch(setAlert('Заказ размещен', 'success', 1000));
    history.push('/portfolio');
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOrdersByUserID = (userId, pg, lm) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/v1/orders?sort=-ordernumber&customer=${userId}&page=${pg}&limit=${lm}`
    );
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOrdersByStatus = (status) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/orders?sort=-ordernumber&${status}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOrders = (page=1, limit=5) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/orders?sort=-ordernumber&page=${page}&limit=${limit}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getOrderByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/orders/${id}`);
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateOrder = (id, newData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `/api/v1/orders/${id}`,
      JSON.stringify(newData),
      config
    );

    dispatch({
      type: UPDATE_ORDER,
      payload: res.data,
    });
    dispatch(setAlert('Статус заказа обновлен', 'success', 1000));
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearOrder = () => async (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
export const clearOrders = () => async (dispatch) => {
  dispatch({ type: CLEAR_ORDERS });
};
