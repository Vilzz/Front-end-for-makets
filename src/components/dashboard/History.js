import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOrdersByUserID } from '../../actions/orders';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import Usernavbar from './Usernavbar';
import Pagination from './Pagination';
import Limiter from './Limiter';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import { Fragment } from 'react';

const History = ({
  ordersLoading,
  orders,
  userLoading,
  user,
  getOrdersByUserID,
}) => {
  const [toggleDetails, setToggleDetails] = useState({});
  const [pagination, setPagination] = useState({
    count: '',
    total: '',
    pages: '',
    active: 1,
  });
  const [limiter, setLimiter] = useState('5');
  useEffect(() => {
    !userLoading &&
      user !== null &&
      getOrdersByUserID(user.data._id, pagination.active, limiter);
    // eslint-disable-next-line
  }, [userLoading, user, getOrdersByUserID]);

  useEffect(() => {
    !ordersLoading &&
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
  }, [ordersLoading, orders]);

  const changeActive = (num) => {
    setPagination({
      ...pagination,
      active: num,
    });
    getOrdersByUserID(user.data._id, num, limiter);
  };

  const getClassName = (status) => {
    switch (status) {
      case 'В работе':
        return 'row tbody-div production';
      case 'Отправлен':
        return 'row tbody-div sent';
      case 'Выполнен':
        return 'row tbody-div finished';
      case 'Отменен':
        return 'row tbody-div canceled';
      case 'Оплачен':
        return 'row tbody-div payed';
      default:
        return 'row tbody-div new';
    }
  };

  const onClick = (e) => {
    const clickedItemId = e.target.attributes.data.value;
    const el = document.getElementById(clickedItemId);
    if (toggleDetails[clickedItemId]) {
      el.style.display = 'none';
      setToggleDetails({
        ...toggleDetails,
        [clickedItemId]: false,
      });
    } else {
      el.style.display = 'block';
      setToggleDetails({
        ...toggleDetails,
        [clickedItemId]: true,
      });
    }
  };
  const setNewLimiter = (e) => {
    setLimiter(e.target.value);
    setPagination({
      ...pagination,
      active: 1,
    });
    getOrdersByUserID(user.data._id, 1, e.target.value);
  };

  return (
    <div className='container component'>
      <div className='row usernav'>
        <Usernavbar />
      </div>
      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>
            <i className='fas fa-shopping-basket'></i> История заказов
          </h2>
        </div>
        <div className='col-sm-12 col-lg-6 limiter'>
          <Limiter limiter={limiter} setNewLimiter={setNewLimiter} />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-12'>
          {!ordersLoading && orders !== null ? (
            orders.count > 0 ? (
              <Fragment>
                <div className='row thead-div'>
                  <div className='col-1'>#</div>
                  <div className='col-2'>Дата</div>
                  <div className='col-3'>Статус</div>
                  <div className='col-3'>Сумма</div>
                  <div className='col-3'></div>
                </div>
                {orders.data.map((order) => (
                  <Fragment key={order._id}>
                    <div className={getClassName(order.status)}>
                      <div className='col-1'>{order.ordernumber}</div>
                      <div className='col-2'>
                        <Moment locale='ru' format='DD-MMMM-YYYY'>
                          {order.orderdate}
                        </Moment>
                      </div>
                      <div className='col-3'>{order.status}</div>
                      <div className='col-3'>{order.total} руб.</div>
                      <div className='col-3'>
                        <button
                          data={order._id}
                          className='btn btn-my-ocean btn-my-sm'
                          onClick={(e) => onClick(e)}
                        >
                          подробнее
                        </button>
                      </div>
                    </div>
                    <div id={order._id} className='inner-wrapper'>
                      <div className='row inner-div'>
                        <div className='col-1'>#</div>
                        <div className='col-2'>Наименование</div>
                        <div className='col-2'>Масштаб</div>
                        <div className='col-1'>Цена</div>
                        <div className='col-1'>Кол-во</div>
                        <div className='col-2'>Упак</div>
                        <div className='col-1'>Цена упак</div>
                        <div className='col-1'>Сумма</div>
                      </div>
                      {order.items.map((item, idx) => (
                        <div className='row items-div' key={item._id}>
                          <div className='col-1'>{idx + 1}</div>
                          <div className='col-2'>{item.item.maketname}</div>
                          <div className='col-2'>1:{item.scale}</div>
                          <div className='col-1'>{item.price} руб.</div>
                          <div className='col-1'>{item.qty} шт.</div>
                          <div className='col-2'>{item.packing.name}</div>
                          <div className='col-1'>
                            {item.packing.addtoprice} руб.
                          </div>
                          <div className='col-2'>{item.rowsum} руб.</div>
                        </div>
                      ))}
                      <hr className='my-hr' />
                      <div className='row total-div'>
                        Итого: {order.total} руб.
                      </div>
                    </div>
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <h4>Вы еще не сделали ни одного заказа</h4>
            )
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

History.propTypes = {
  getOrdersByUserID: PropTypes.func.isRequired,
  orders: PropTypes.object,
  ordersLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ordersLoading: state.orders.loading,
  orders: state.orders.orders,
  userLoading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getOrdersByUserID })(History);
