/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from '../../util/router';
import { BACKEND_URL, ENDPOINT, PRODUCT_TYPE } from '../../data/constants';

const PackageSearchBar = props => {
  const { isInverted } = props;
  const router = useRouter();
  const today = new Date();

  const [locations, setLocations] = useState([]);
  const [fromCityCode, setFromCityCode] = useState('');
  const [toCityCode, setToCityCode] = useState('');
  const [date, setDate] = useState(today);
  const [errorMsg, setErrorMsg] = useState('');

  async function fetchData() {
    const res = await fetch(`${BACKEND_URL}${ENDPOINT.GET_AIRPORT}`);
    res
      .json()
      .then(r => {
        const uniques = r.data.filter(
          (v, i, a) => a.findIndex(t => t.cityCode === v.cityCode) === i,
        );
        const results = uniques.map(e => {
          return {
            cityCode: e.cityCode,
            cityName: e.cityName,
          };
        });
        setLocations(results);
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    setFromCityCode(props.fromCityCode || '');
    setToCityCode(props.toCityCode || '');
    setDate(props.date || today);
    fetchData();
  }, []);

  const locationSelection = () =>
    locations.map(l => (
      <option key={`${l.cityCode}`} value={l.cityCode}>
        {`${l.cityName}`}
      </option>
    ));

  const closeModal = () => {
    setErrorMsg('');
  };

  const validateForm = () => {
    if (!fromCityCode) {
      setErrorMsg('Please enter "From" location.');
      return false;
    }

    if (!toCityCode) {
      setErrorMsg('Please enter "To" location.');
      return false;
    }

    if (fromCityCode === toCityCode) {
      setErrorMsg('Please enter unique "From" and "To" location.');
      return false;
    }

    if (!date) {
      setErrorMsg('Please input "Start Date".');
      return false;
    }

    return true;
  };

  const search = () => {
    if (!validateForm()) {
      return;
    }
    router.push({
      pathname: '/searchresult',
      state: { type: PRODUCT_TYPE.PACKAGES, query: { fromCityCode, toCityCode, date } },
    });
  };

  return (
    <div>
      <div className="columns is-horizontal is-vcentered is-variable is-1">
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <div className="select is-fullwidth">
              <select value={fromCityCode} onChange={e => setFromCityCode(e.target.value)}>
                <option value="">From</option>
                {locationSelection()}
              </select>
            </div>
            <div className="icon is-small is-left">
              <i className="fas fa-search-location" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <div className="select is-fullwidth">
              <select value={toCityCode} onChange={e => setToCityCode(e.target.value)}>
                <option value="">To</option>
                {locationSelection()}
              </select>
            </div>
            <div className="icon is-small is-left">
              <i className="fas fa-search-location" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <DatePicker
              className="input"
              minDate={today}
              showPopperArrow={false}
              selected={date}
              onChange={d => setDate(d)}
              placeholderText="Start Date"
            />
            <div className="icon is-small is-left">
              <i className="fas fa-calendar" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <input className="input" type="text" placeholder="Class" readOnly value="2 Travelers" />
            <div className="icon is-small is-left">
              <i className="fas fa-user-friends" />
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <button
            type="submit"
            onClick={search}
            className={`button is-primary is-rounded${isInverted ? ' is-inverted' : ''}`}
          >
            Search
          </button>
        </div>
      </div>
      {errorMsg && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal} />
          <div className="modal-content">
            <div className="box">{errorMsg}</div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="modal-close is-large"
            aria-label="close"
          />
        </div>
      )}
    </div>
  );
};

export default PackageSearchBar;
