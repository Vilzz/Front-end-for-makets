import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOrders, getOrdersByStatus } from '../../actions/orders';
import Navbar from '../dashboard/Navbar';
import Spinner from '../layout/Spinner';
import Order from './Order';
import Filter from './Filter';
import Search from './Search';
import Limiter from '../dashboard/Limiter';
import Pagination from '../dashboard/Pagination';
import PropTypes from 'prop-types';

const Orders = ({ 
    loading, 
    orders, 
    getOrders, 
    getOrdersByStatus 
  }) => {
  const [ordersState, setOrdersState] = useState([]);

  const [pagination, setPagination] = useState({
    count: '',
    total: '',
    pages: '',
    active: 1,
  });

  const [limiter, setLimiter] = useState('5');

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    !loading &&
      orders !== null &&
      setPagination({
        ...pagination,
        count: orders.count,
        total: orders.total,
        pages:
          orders.total % orders.limit === 0
            ? orders.total / orders.limit
            : Math.floor(orders.total / orders.limit) + 1,
      });
    // eslint-disable-next-line
  }, [loading, orders]);

  useEffect(() => {
    if (!loading && orders !== null) {
      setOrdersState([...orders.data]);
    }
  }, [loading, orders]);

  const statusFilterOn = (statusName) => {
    getOrdersByStatus(`status=${statusName}`);
  };

  const statusFilterOff = () => {
    getOrders();
  };

  const setNewLimiter = (e) => {
    setLimiter(e.target.value);
    setPagination({
      ...pagination,
      active: 1,
    });
    getOrders(1, e.target.value);
  };

  const changeActive = (num) => {
    setPagination({
      ...pagination,
      active: num,
    });
    getOrders(num, limiter);
  };

  const onSearch = (searchStr) => {
    const arr = [
      ...ordersState.filter((order) => order.customer.name === searchStr),
    ];
    if (arr.length > 0) {
      setOrdersState([...arr]);
    }
  };
  // переделать поиск

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row filters'>
        <div className='col-sm-12 col-lg-4'>
          <h2>
            <i className='fas fa-receipt mr-3'></i> Список заказов
          </h2>
        </div>
        <div className='col-sm-12 col-lg-8 statusfilter'>
          <Search onSearch={onSearch} />
          <Filter
            statusFilterOn={statusFilterOn}
            statusFilterOff={statusFilterOff}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12 limiter'>
           <Limiter limiter={limiter} setNewLimiter={setNewLimiter}/>
        </div>
      </div>
      <hr />
      <div className='row orders'>
        <div className='col-sm-12'>
          {!loading && orders !== null ? (
            <table className='table table-sm table-striped'>
              <thead>
                <tr>
                  <th scope='col'>Номер заказа</th>
                  <th scope='col'>Статус</th>
                  <th scope='col'>Заказчик</th>
                  <th scope='col'>Телефон</th>
                  <th scope='col'>Почта</th>
                  <th scope='col'>Дата заказа</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {ordersState.map((order) => (
                  <Order order={order} key={order._id} />
                ))}
              </tbody>
            </table>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      {pagination.total > limiter && (
        <div className='mypagination'>
          <Pagination pagesData={pagination} changeActive={changeActive} />
        </div>
      )}
    </div>
  );
};

Orders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  getOrdersByStatus: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.object,
};
const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
});

export default connect(mapStateToProps, { getOrders, getOrdersByStatus })(
  Orders
);
