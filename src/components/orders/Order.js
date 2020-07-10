import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Order = ({ order }) => {
  return (
    <tr>
      <td>{order.ordernumber}</td>
      <td>{order.status}</td>
      <td>{order.customer.name}</td>
      <td>{order.customer.phone}</td>
      <td>{order.customer.email}</td>
      <td>
        <Moment locale='ru' format='DD-MMMM-YYYY'>
          {order.orderdate}
        </Moment>
      </td>
      <td>
        <Link
          to={`/admindashboard/order/${order._id}`}
          className='btn btn-my-ocean btn-my-sm'
        >
          Подробнее
        </Link>
      </td>
    </tr>
  );
};

Order.propTypes = {
  order: PropTypes.object.isRequired,
};

export default Order;
