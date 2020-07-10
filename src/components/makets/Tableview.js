import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Tableview = ({ makets, loading, ctgs, delItem }) => {
  const onClickDel = (e) => {
    e.preventDefault();
    delItem(e.target.attributes.data.value);
  };

  return (
    <Fragment>
      {!loading && makets !== null ? (
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Наименование</th>
              <th scope='col'>Краткое описание</th>
              <th scope='col'>Категория</th>
              <th scope='col'>Материал</th>
              <th scope='col'>Масштабы</th>
              <th scope='col'>изображение</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {makets.data.map((maket) => (
              <tr key={maket._id}>
                <td>{maket.maketname}</td>
                <td>{maket.shortdesc}</td>
                <td>
                  {ctgs
                    .filter((ctg) => ctg.catid === maket.category._id)
                    .map((ctg) => ctg.catname)}
                </td>
                <td>{maket.material}</td>
                <td>
                  {maket.attributes ? (
                    maket.attributes.attributes
                      .map((attr) => attr.scalesize)
                      .toString()
                  ) : (
                    <Link
                      to={`/admindashboard/${maket._id}/addattributes`}
                      className='btn btn-sm btn-my-ocean'
                    >
                      Добавить
                    </Link>
                  )}
                </td>
                <td>{maket.image}</td>
                <td>
                  <Link
                    to={`/admindashboard/editmaket/${maket._id}`}
                    className='btn btn-sm btn-my-ocean'
                    style={{ marginRight: '5px' }}
                  >
                    изм
                  </Link>
                  <button
                    data={maket._id}
                    className='btn btn-sm btn-my-danger'
                    onClick={(e) => onClickDel(e)}
                    style={{ marginRight: '5px' }}
                  >
                    удл
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Tableview.propTypes = {
  makets: PropTypes.object,
  loading: PropTypes.bool,
  ctgs: PropTypes.array.isRequired,
};

export default Tableview;
