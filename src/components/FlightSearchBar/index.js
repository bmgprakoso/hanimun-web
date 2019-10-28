/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import './styles.scss';
import { useRouter } from '../../util/router';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';

const FROM = 'FROM';
const TO = 'TO';

const FlightSearchBar = props => {
  const router = useRouter();

  const [airports, setAirports] = useState([]);
  const [fromID, setFromID] = useState('');
  const [toID, setToID] = useState('');
  const [date, setDate] = useState(new Date());
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
            airportCode: e.airportCode,
            airportName: e.airportName,
            cityCode: e.cityCode,
            cityName: e.cityName,
          };
        });
        setAirports(results);
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    setFromID(props.fromID || '');
    setToID(props.toID || '');
    setDate(props.date || new Date());
    fetchData();
  }, []);

  const airportSelection = () =>
    airports.map(airport => (
      <option key={`${airport.cityCode}`} value={airport.cityCode}>
        {`${airport.cityName}`}
      </option>
    ));

  const closeModal = () => {
    setErrorMsg('');
  };

  const handleChange = (e, type) => {
    const { value } = e.target;
    if (type === FROM) {
      setFromID(value);
    } else {
      setToID(value);
    }
  };

  const validateForm = () => {
    if (!fromID) {
      setErrorMsg('Please enter "From" airport.');
      return false;
    }

    if (!toID) {
      setErrorMsg('Please enter "To" airport.');
      return false;
    }

    if (fromID === toID) {
      setErrorMsg('Please enter unique "From" and "To" airports..');
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
      state: { fromID, toID, date },
    });
  };

  return (
    <div>
      <div className="columns is-horizontal is-vcentered is-variable is-1">
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <div className="select is-fullwidth">
              <select value={fromID} onChange={e => handleChange(e, FROM)}>
                <option value="">From where?</option>
                {airportSelection()}
              </select>
            </div>
            <div className="icon is-small is-left">
              <i className="fas fa-plane-departure" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <div className="select is-fullwidth">
              <select value={toID} onChange={e => handleChange(e, TO)}>
                <option value="">To where?</option>
                {airportSelection()}
              </select>
            </div>
            <div className="icon is-small is-left">
              <i className="fas fa-plane-arrival" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <DatePicker
              className="input"
              minDate={new Date()}
              showPopperArrow={false}
              selected={date}
              onChange={d => setDate(d)}
            />
            <div className="icon is-small is-left">
              <i className="fas fa-calendar" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Class"
              readOnly
              value="2 Travelers, Economy"
            />
            <div className="icon is-small is-left">
              <i className="fas fa-user-friends" />
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <button
            type="submit"
            onClick={search}
            className={`button is-primary is-rounded${props.isInverted ? ' is-inverted' : ''}`}
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

export default FlightSearchBar;
