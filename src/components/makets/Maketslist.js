import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getMaketsList,
  deleteMaket,
  getFilteredMakets,
} from '../../actions/makets';
import { getCategories } from '../../actions/category';

import Navbar from '../dashboard/Navbar';
import Filter from './Filter';
import Viewtoggler from './Viewtoggler';
import Tableview from './Tableview';
import Cardsview from './Cardsview';
import PropTypes from 'prop-types';

import './Makets.scss';

const Maketslist = ({
  makets,
  mloading,
  getMaketsList,
  deleteMaket,
  getFilteredMakets,
  categories,
  cloading,
  getCategories,
}) => {
  const [ctgOptionsList, setCtgOptionsList] = useState([]);
  const [viewstate, setViewState] = useState(false);

  useEffect(() => {
    getCategories();
    getMaketsList();
  }, [getMaketsList, getCategories]);

  useEffect(() => {
    setCtgOptionsList(
      !cloading && categories !== null
        ? categories.data.map((category) => {
            return { catid: category._id, catname: category.categoryname };
          })
        : []
    );
  }, [cloading, categories]);

  const viewToggle = (name) => {
    switch (name) {
      case 'cards':
        setViewState(true);
        break;
      case 'table':
      default:
        setViewState(false);
        break;
    }
  };
  const filterOn = (categoryid) => {
    getFilteredMakets(`category=${categoryid}`);
  };

  const filterOff = () => {
    getMaketsList();
  };

  const delItem = (id) => {
    deleteMaket(id);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>
            <i className='fas fa-list-alt mr-3'></i>Список Макетов
          </h2>
        </div>
        <div className='col-sm-12 col-lg-6'>
          <div className='row actionpanel'>
            <div className='viewtoggler'>
              <Viewtoggler viewToggle={viewToggle} />
            </div>
            <div className='filter'>
              <Filter
                list={ctgOptionsList}
                filterOn={filterOn}
                filterOff={filterOff}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='row'>
        {!viewstate ? (
          <Tableview
            makets={makets}
            loading={mloading}
            ctgs={ctgOptionsList}
            delItem={delItem}
          />
        ) : (
          <Cardsview
            makets={makets}
            loading={mloading}
            ctgs={ctgOptionsList}
            delItem={delItem}
          />
        )}
      </div>
    </div>
  );
};

Maketslist.propTypes = {
  getFilteredMakets: PropTypes.func.isRequired,
  deleteMaket: PropTypes.func.isRequired,
  getMaketsList: PropTypes.func.isRequired,
  mloading: PropTypes.bool.isRequired,
  makets: PropTypes.object,
  getCategories: PropTypes.func.isRequired,
  cloading: PropTypes.bool.isRequired,
  categories: PropTypes.object,
};
const mapStateToProps = (state) => ({
  mloading: state.makets.loading,
  makets: state.makets.makets,
  cloading: state.categories.loading,
  categories: state.categories.categories,
});

export default connect(mapStateToProps, {
  getMaketsList,
  deleteMaket,
  getFilteredMakets,
  getCategories,
})(Maketslist);
