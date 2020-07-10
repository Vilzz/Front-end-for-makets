import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMaketBySlug, clearMaket } from '../../actions/makets';
import Spinner from '../layout/Spinner';
import Itemparams from './Itemparams';
import PropTypes from 'prop-types';

const Item = ({
  clearMaket,
  getMaketBySlug,
  maket,
  maketLoading,
  user,
  authLoading,
  match,
}) => {
  const { slug } = match.params;
  useEffect(() => {
    getMaketBySlug(slug);
  }, [getMaketBySlug, slug]);

  const toBasketClicked = () => {
    clearMaket();
  };

  return (
    <div className='container component'>
      {!maketLoading && maket !== null ? (
        <Fragment>
          <h1>Макет {maket.data.maketname}</h1>
          <hr />
          <div className='row'>
            <div className='imageholder col-md-5 col-sm-12'>
              <div className='row'>
                <img
                  src={`/images/${maket.data.image}`}
                  alt={maket.data.maketname}
                />
              </div>
              <div className='row mb-2'>
                <div className='col-1 im'>1</div>
                <div className='col-1 im'>2</div>
                <div className='col-1 im'>3</div>
              </div>
            </div>
            <div className='description col-md-7 col-sm-12'>
              <div className='row p-2'>
                <div className='col-sm-12 col-md-11'>
                  <h4>
                    Наименование: <span>{maket.data.shortdesc}</span>
                  </h4>
                  <p>
                    Основной Материал макета:
                    <span> {maket.data.material}</span>
                  </p>
                  <p>
                    Возможные варианты упаковки:{' '}
                    {maket.data.packing.map((pack) => (
                      <a
                        href='#!'
                        className='mr-2'
                        key={pack._id}
                        style={{ color: '#00C586' }}
                      >
                        {pack.name}
                      </a>
                    ))}
                  </p>
                  <p>
                    Описание: <span>{maket.data.description}</span>
                  </p>
                </div>
                <div className='col-12'>
                  <Link to='/portfolio' className='btn btn-my-ocean mr-3'>
                    Вернуться к списку
                  </Link>
                  <Link
                    to='/basket'
                    className='btn btn-my-ocean'
                    onClick={() => toBasketClicked()}
                  >
                    Просмотреть корзину
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Itemparams
            maketAttr={maket.data.attributes}
            maketPacking={maket.data.packing}
            maketId={maket.data._id}
            maketName={maket.data.maketname}
            maketImage={maket.data.image}
            userId={!authLoading && user !== null ? user.data._id : null}
          />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Item.propTypes = {
  clearMaket: PropTypes.func.isRequired,
  getMaketBySlug: PropTypes.func.isRequired,
  maket: PropTypes.object,
  maketLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  authLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  maket: state.makets.maket,
  maketLoading: state.makets.loading,
  user: state.auth.user,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getMaketBySlug, clearMaket })(Item);
