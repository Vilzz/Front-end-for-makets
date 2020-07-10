import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getMaketByID,
  updateMaket,
  getImages,
  clearImages,
} from '../../actions/makets';
import { getCategories } from '../../actions/category';
import { getPackings } from '../../actions/packing';
import Navbar from '../dashboard/Navbar';
import PropTypes from 'prop-types';

const Editmaket = ({
  getPackings,
  packings,
  packingLoading,
  categories,
  cloading,
  getCategories,
  maket,
  mloading,
  getMaketByID,
  updateMaket,
  imgloading,
  getImages,
  clearImages,
  images,
  match,
  history,
}) => {
  const { id } = match.params;

  useEffect(() => {
    getCategories();
    getImages();
    getMaketByID(id);
    getPackings();
  }, [getImages, getCategories, getMaketByID, id, getPackings]);

  const [ctgOptionsList, setCtgOptionsList] = useState([]);

  const [currentCtg, setCurrentCtg] = useState({});

  const [imgOptionsList, setImgOptionsList] = useState([]);

  const [currentImg, setCurrentImg] = useState({});

  const [packingsData, setPackingsData] = useState([]);

  useEffect(() => {
    setPackingsData(
      !packingLoading && packings !== null
        ? packings.data.map((packing) => {
            return { id: packing._id, name: packing.name, selected: false };
          })
        : []
    );
  }, [packingLoading, packings]);

  const [maketData, setMaketdata] = useState({
    image: '',
    material: '',
    packing: [],
    maketname: '',
    shortdesc: '',
    category: '',
    description: '',
    attributes: '',
  });
  useEffect(() => {
    setCtgOptionsList(
      !cloading && categories !== null
        ? categories.data.map((category) => {
            return { catid: category._id, catname: category.categoryname };
          })
        : []
    );
  }, [cloading, categories]);

  useEffect(() => {
    setImgOptionsList(
      !imgloading && images !== null
        ? images.data.map((image) => {
            return { id: image.id + 1, filename: image.filename };
          })
        : []
    );
  }, [imgloading, images]);

  useEffect(() => {
    setMaketdata({
      image: !mloading && maket !== null ? maket.data.image : '',
      material: !mloading && maket !== null ? maket.data.material : '',
      packing: !mloading && maket !== null ? maket.data.packing : [],
      maketname: !mloading && maket !== null ? maket.data.maketname : '',
      shortdesc: !mloading && maket !== null ? maket.data.shortdesc : '',
      category: !mloading && maket !== null ? maket.data.category : '',
      description: !mloading && maket !== null ? maket.data.description : '',
      attributes: !mloading && maket !== null ? maket.data.attributes : '',
    });
  }, [mloading, maket, id]);

  useEffect(() => {
    setCurrentCtg({
      id: maketData.category,
      name: ctgOptionsList
        .filter((ctg) => ctg.catid === maketData.category)
        .map((ctg) => ctg.catname)[0],
    });
  }, [ctgOptionsList, maketData]);

  useEffect(() => {
    setCurrentImg({
      id: imgOptionsList
        .filter((img) => img.filename === maketData.image)
        .map((img) => img.id)[0],
      filename: maketData.image,
    });
  }, [imgOptionsList, maketData]);

  const onChange = (e) =>
    setMaketdata({ ...maketData, [e.target.name]: e.target.value });

  const setNewCtg = (e) => {
    setCurrentCtg({
      id: e.target.value,
      name: e.target.options[e.target.options.selectedIndex].text,
    });
    setMaketdata({
      ...maketData,
      category: e.target.value,
    });
  };
  const setNewImg = (e) => {
    setCurrentImg({
      id: e.target.value,
      filename: e.target.options[e.target.options.selectedIndex].text,
    });
    setMaketdata({
      ...maketData,
      image: e.target.options[e.target.options.selectedIndex].text,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateMaket(maketData, id, history);
    clearImages();
  };

  const killWarning = () => null;
  const onMouseDown = (e) => {
    const inArray = maketData.packing.some((el) => el === e.target.value);
    if (e.ctrlKey) {
      !inArray
        ? setMaketdata({
            ...maketData,
            packing: [...maketData.packing, e.target.value],
          })
        : setMaketdata({
            ...maketData,
            packing: [
              ...maketData.packing.filter((item) => item !== e.target.value),
            ],
          });
    } else {
      setMaketdata({ ...maketData, packing: [e.target.value] });
    }
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <h2>
          <i className='far fa-edit mr-3 ml-3'></i>Редактировать макет
        </h2>
        <hr />
      </div>
      <div className='row'>
        <div className='col-sm-3 editimageblock mt-3'>
          {currentImg.filename !== undefined && (
            <Fragment>
              <img
                src={`/images/${currentImg.filename}`}
                alt={maketData.maketname}
              />

              <Link
                to={`/admindashboard/addimage/${id}`}
                className='btn btn-block btn-sm btn-my-ocean mt-3'
              >
                Добавить изображение
              </Link>
              {maketData.attributes && (
                <Link
                  to={`/admindashboard/${id}/attributes/${maketData.attributes}`}
                  className='btn btn-block btn-sm btn-my-ocean mt-3'
                >
                  Параметры макета
                </Link>
              )}
            </Fragment>
          )}
        </div>
        <div className='col-sm-6'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='name'>
                <small>Наименование:</small>
              </label>
              <input
                id='name'
                className='form-control form-control-sm'
                type='text'
                name='maketname'
                value={maketData.maketname}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='image'>
                <small>Изображение:</small>
              </label>
              <select
                id='image'
                className='form-control form-control-sm'
                type='text'
                name='image'
                value={currentImg.id}
                onChange={(e) => setNewImg(e)}
              >
                <option value={currentImg.id}>{currentImg.filename}</option>

                {imgOptionsList
                  .filter((img) => img.filename !== currentImg.filename)
                  .map((img) => (
                    <option value={img.id} key={img.id}>
                      {img.filename}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='category'>
                <small>Категория:</small>
              </label>
              <select
                id='category'
                className='form-control form-control-sm'
                type='text'
                name='category'
                value={currentCtg.id}
                onChange={(e) => setNewCtg(e)}
              >
                <option value={currentCtg.id}>{currentCtg.name}</option>

                {ctgOptionsList
                  .filter((ctg) => ctg.catid !== currentCtg.id)
                  .map((ctg) => (
                    <option value={ctg.catid} key={ctg.catid}>
                      {ctg.catname}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='material'>
                <small>Материал:</small>
              </label>
              <input
                id='material'
                className='form-control form-control-sm'
                type='text'
                name='material'
                value={maketData.material}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='packing'>
                <small>
                  Упаковка: (для выбора нескольких значений удерживайти кнопку
                  CTRL)
                </small>
              </label>
              <select
                multiple={true}
                id='packing'
                className='form-control form-control-sm'
                type='text'
                name='packing'
                value={maketData.packing}
                onChange={killWarning}
                onMouseDown={(e) => onMouseDown(e)}
              >
                {packingsData.map((pack) => (
                  <Fragment key={pack.id}>
                    <option value={pack.id}>{pack.name}</option>
                  </Fragment>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='shortdesc'>
                <small>Краткое описание:</small>
              </label>
              <input
                id='shortdesc'
                className='form-control form-control-sm'
                type='text'
                name='shortdesc'
                value={maketData.shortdesc}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>
                <small>Описание:</small>
              </label>
              <textarea
                id='description'
                className='form-control form-control-sm'
                type='text'
                name='description'
                value={maketData.description}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className='btn btn-my-ocean btn-sm mr-2'
              value='Сохранить'
            />
            <Link
              className='btn btn-my-ocean btn-sm'
              to='/admindashboard/makets'
            >
              Вернуться к списку макетов
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

Editmaket.propTypes = {
  updateMaket: PropTypes.func.isRequired,
  getMaketByID: PropTypes.func.isRequired,
  mloading: PropTypes.bool.isRequired,
  maket: PropTypes.object,
  getCategories: PropTypes.func.isRequired,
  cloading: PropTypes.bool.isRequired,
  categories: PropTypes.object,
  getImages: PropTypes.func.isRequired,
  clearImages: PropTypes.func.isRequired,
  getPackings: PropTypes.func.isRequired,
  packingLoading: PropTypes.bool.isRequired,
  packings: PropTypes.object,
};
const mapStateToProps = (state) => ({
  maket: state.makets.maket,
  mloading: state.makets.loading,
  categories: state.categories.categories,
  cloading: state.categories.loading,
  imgloading: state.makets.imgloading,
  images: state.makets.images,
  packings: state.packing.packings,
  packingLoading: state.packing.loading,
});

export default connect(mapStateToProps, {
  getMaketByID,
  updateMaket,
  getCategories,
  getImages,
  clearImages,
  getPackings,
})(Editmaket);
