import React, { useEffect, useState, Fragment } from 'react';
import Navbar from '../dashboard/Navbar';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrderByID, clearOrder, updateOrder } from '../../actions/orders';
import './Orders.scss';
import PropTypes from 'prop-types';

const Orderdetails = ({
  loading,
  order,
  getOrderByID,
  clearOrder,
  updateOrder,
  match,
}) => {
  const { id } = match.params;
  const statusOptions = [
    'Новый',
    'Оплачен',
    'В работе',
    'Отменен',
    'Выполнен',
    'Отправлен',
  ];
  const [status, setStatus] = useState('');
  useEffect(() => {
    getOrderByID(id);
  }, [id, getOrderByID]);

  useEffect(() => {
    setStatus(!loading && order !== null ? order.data.status : '');
  }, [loading, order]);

  const onClick = () => {
    clearOrder();
  };

  const onStatusSubmit = (e) => {
    e.preventDefault();
    updateOrder(id, { status });
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>

      {!loading && order !== null ? (
        <Fragment>
          <div className='row'>
            <div className='col-sm-12 col-md-6'>
              <h2>
                Заказ № {order.data.ordernumber} от{' '}
                {
                  <Moment locale='ru' format='DD-MMMM-YYYY'>
                    {order.data.orderdate}
                  </Moment>
                }
              </h2>
            </div>
            <div className='col-sm-12 col-md-6 statusbar'>
              <form className='form' onSubmit={(e) => onStatusSubmit(e)}>
                <div className='input-group input-group-sm'>
                  <label htmlFor='status' className='mr-2 mt-1'>
                    Статус заказа:
                  </label>
                  <select
                    name='status'
                    id='status'
                    className='form-control'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={status}>{status}</option>
                    {statusOptions
                      .filter((opt) => opt !== status)
                      .map((opt, idx) => (
                        <option value={opt} key={idx}>
                          {opt}
                        </option>
                      ))}
                  </select>
                  <div className='input-group-append'>
                    <button className='btn btn-my-ocean btn-sm'>
                      Изменить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <hr />
          <h4>Список изделий заказа</h4>
          <table className='table table-sm table-striped mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Наименование</th>
                <th>Масштаб</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Упаковка</th>
                <th>Цена упак.</th>
                <th>Итого</th>
              </tr>
            </thead>
            <tbody>
              {order.data.items.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.item.maketname}</td>
                  <td>1:{item.scale}</td>
                  <td>{item.qty} шт.</td>
                  <td>{item.price} руб.</td>
                  <td>{item.packing.name}</td>
                  <td>{item.packing.addtoprice} руб.</td>
                  <td>{item.rowsum} руб.</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className='row justify-content-end mr-5'>
            Общая сумма заказа: {order.data.total} руб.
          </div>
          <hr />
          <div className='row mb-3'>
            <div className='col-sm-12'>
              Комментарий заказчика: {order.data.comment}
            </div>
          </div>
          <hr />
          <div className='row mb-5'>
            <div className='col-sm-3'>Заказчик: {order.data.customer.name}</div>
            <div className='col-sm-3'>
              Номер телефона: {order.data.customer.phone}
            </div>
            <div className='col-sm-6'>
              Электронная почта: {order.data.customer.email}
            </div>
          </div>
          <Link
            to='/admindashboard/orders'
            className='btn btn-sm btn-my-ocean'
            onClick={onClick}
          >
            Вернуться
          </Link>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Orderdetails.propTypes = {
  getOrderByID: PropTypes.func.isRequired,
  clearOrder: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  order: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loading: state.orders.loading,
  order: state.orders.order,
});

export default connect(mapStateToProps, {
  getOrderByID,
  clearOrder,
  updateOrder,
})(Orderdetails);
