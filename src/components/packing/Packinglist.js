import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPackings, deletePacking } from '../../actions/packing';
import Navbar from '../dashboard/Navbar';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Packinglist = ({ getPackings, deletePacking, loading, packings }) => {
  useEffect(() => {
    getPackings();
  }, [getPackings]);

  const delClicked = (e) => {
    deletePacking(e.target.attributes.data.value);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>
            <i className='fas fa-luggage-cart mr-3'></i>Список упаковок
          </h2>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-sm-6'>
          {!loading && packings !== null ? (
            packings.data.map((packing) => (
              <div className='card border-secondary mb-3' key={packing._id}>
                <div className='card-body'>
                  <h5>{packing.name}</h5>
                  <p className='card-text'>{packing.description}</p>
                  <p className='card-text'>{packing.addtoprice} руб.</p>
                </div>
                <div className='card-footer'>
                  <Link
                    to={`/admindashboard/editpacking/${packing._id}`}
                    className='btn btn-my-ocean btn-sm mr-3'
                  >
                    Изменить
                  </Link>
                  <button
                    data={packing._id}
                    className='btn btn-sm btn-my-danger'
                    onClick={(e) => delClicked(e)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='row'>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Packinglist.propTypes = {
  getPackings: PropTypes.func.isRequired,
  deletePacking: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  packings: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loading: state.packing.loading,
  packings: state.packing.packings,
});

export default connect(mapStateToProps, { getPackings, deletePacking })(
  Packinglist
);
