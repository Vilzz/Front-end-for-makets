import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Cardsview = ({ makets, loading, ctgs, delItem }) => {
  const onClickDel = (e) => {
    e.preventDefault();
    delItem(e.target.attributes.data.value);
  };

  return (
    <div className='cardview'>
      {!loading && makets !== null ? (
        makets.data.map((maket) => (
          <div className='card mb-4' key={maket._id}>
            <div className='row no-gutters'>
              <div className='col-md-6'>
                <img
                  src={`/images/${maket.image}`}
                  className='card-img'
                  alt={maket.maketname}
                />
              </div>
              <div className='col-md-6'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    Наименование: <span>{maket.maketname}</span>
                  </h5>
                  <p className='card-text'>
                    Категория:{' '}
                    <span>
                      {ctgs
                        .filter((ctg) => ctg.catid === maket.category._id)
                        .map((ctg) => ctg.catname)}
                    </span>
                  </p>
                  <p className='card-text'>
                    Краткое описание: <span>{maket.shortdesc}</span>
                  </p>
                  <p className='card-text'>
                    Материал макета: <span>{maket.material}</span>
                  </p>

                  <p className='card-text'>
                    Упаковка:{' '}
                    <span>
                      {maket.packing.map((pack) => (
                        <span className='mr-2' key={pack._id}>
                          {pack.name}
                        </span>
                      ))}
                    </span>
                  </p>

                  <p className='card-text'>
                    Масштабы:{' '}
                    <span>
                      {maket.attributes
                        ? maket.attributes.attributes
                            .map((attr) => attr.scalesize)
                            .toString()
                        : ''}
                    </span>
                  </p>
                  <div className='card-description'>
                    <h6>ОПИСАНИЕ</h6>
                    <p>{maket.description}</p>
                  </div>
                </div>
                <div className='card-footer'>
                  <Link
                    to={`/admindashboard/editmaket/${maket._id}`}
                    className='btn btn-my-ocean btn-sm'
                  >
                    Редактировать
                  </Link>
                  <button
                    data={maket._id}
                    onClick={(e) => onClickDel(e)}
                    className='btn btn-my-danger btn-sm'
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Cardsview.propTypes = {
  makets: PropTypes.object,
  loading: PropTypes.bool,
  ctgs: PropTypes.array.isRequired,
};

export default Cardsview;
