import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import makets from './makets';
import categories from './categories';
import users from './users';
import orders from './orders';
import attributes from './attributes';
import packing from './packing';
import basket from './basket';
import contact from './contact';

export default combineReducers({
  alert,
  auth,
  makets,
  categories,
  users,
  orders,
  attributes,
  packing,
  basket,
  contact,
});
