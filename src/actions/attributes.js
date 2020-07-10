import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ATTRIBUTES,
  ATTRIBUTES_ERROR,
  CLEAR_ATTRIBUTES,
  DELETE_ATTRIBUTE,
  ADD_ATTRIBUTE,
  CREATE_ATTRIBUTES,
} from './types';

export const getAttributesById = (attrid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/attributes/${attrid}`);
    dispatch({
      type: GET_ATTRIBUTES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ATTRIBUTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearAttributes = () => (dispatch) => {
  dispatch({ type: CLEAR_ATTRIBUTES });
};

export const addAttrGroup = (attrId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `/api/v1/attributes/group/${attrId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_ATTRIBUTE,
      payload: res.data,
    });
    dispatch(setAlert('Группа параметров успешно добавлена', 'success', 2000));
  } catch (err) {
    dispatch({
      type: ATTRIBUTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createAttributes = (maketid, attributes, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/v1/attributes/${maketid}`,
      attributes,
      config
    );
    dispatch({
      type: CREATE_ATTRIBUTES,
      payload: res.data,
    });
    history.push('/admindashboard/makets');
  } catch (err) {
    dispatch({
      type: ATTRIBUTES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAttrGroup = (attrId, groupId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = {
    id: attrId,
  };
  if (window.confirm('Удалить группу параметров?')) {
    try {
      const res = await axios.post(
        `/api/v1/attributes/group/${groupId}`,
        body,
        config
      );
      dispatch({
        type: DELETE_ATTRIBUTE,
        payload: res.data,
      });
      dispatch(setAlert('Парметры макета обновлены', 'success', 2000));
    } catch (err) {
      dispatch({
        type: ATTRIBUTES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
