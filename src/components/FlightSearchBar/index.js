import React from 'react';
import DatePicker from 'react-datepicker';
import Airports from '../../data/airports';
import './styles.scss';

const FROM = 'FROM';
const TO = 'TO';

class FlightSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromID: '',
      toID: '',
      date: new Date(),
    };
  }

  airportSelection = () =>
    Airports.map(airport => (
      <option key={airport.airportID} value={airport.airportID}>
        {`${airport.city} – ${airport.name}`}
      </option>
    ));

  handleChange = (e, type) => {
    const { value } = e.target;
    if (type === FROM) {
      this.setState({ fromID: value });
    } else {
      this.setState({ toID: value });
    }
  };

  search = () => {
    const { fromID, toID, date } = this.state;
    console.log(fromID, toID, date);
  };

  setDate = date => {
    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    return (
      <div className="columns is-horizontal is-vcentered is-variable is-1">
        <div className="column">
          <div className="control is-expanded has-icons-left">
            <div className="select">
              <select
                className="FlightSearchBar__select"
                onChange={e => this.handleChange(e, FROM)}
              >
                <option value="">From where?</option>
                {this.airportSelection()}
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
              <select className="FlightSearchBar__select" onChange={e => this.handleChange(e, TO)}>
                <option value="">To where?</option>
                {this.airportSelection()}
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
              onChange={d => this.setDate(d)}
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
            onClick={this.search}
            className="button is-primary is-inverted is-rounded"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default FlightSearchBar;
