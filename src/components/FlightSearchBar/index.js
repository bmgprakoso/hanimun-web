import React from 'react';
import Airports from '../../data/airports';
import './styles.scss';

function FlightSearchBar(props) {
  return (
    <div className="columns is-horizontal is-vcentered">
      <div className="column is-full">
        <div className="columns">
          <div className="column">
            <div className="control is-expanded has-icons-left">
              <div className="select">
                <select>
                  {Airports.map(airport => (
                    <option key={airport.airportID} value={airport.airportID}>
                      {`${airport.city} – ${airport.name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-plane-departure" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="control is-expanded has-icons-left">
              <div className="select">
                <select>
                  {Airports.map(airport => (
                    <option key={airport.airportID} value={airport.airportID}>
                      {`${airport.city} – ${airport.name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-plane-arrival" />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="control is-expanded has-icons-left">
              <input className="input" type="text" placeholder="Date" />
              <span className="icon is-small is-left">
                <i className="fas fa-calendar" />
              </span>
            </div>
          </div>
          <div className="column">
            <div className="control is-expanded has-icons-left">
              <input className="input" type="text" placeholder="Class" />
              <span className="icon is-small is-left">
                <i className="fas fa-user-friends" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <button className="button is-primary is-inverted">Search</button>
      </div>
    </div>
  );
}

export default FlightSearchBar;
