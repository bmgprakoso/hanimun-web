import React from 'react';
import { useRouter } from '../../util/router';
import { formatHourMinute, formatPrice, timeDiff } from '../../util/display';
import { AIRLINE_LOGO, PRODUCT_TYPE } from '../../data/constants';
import './styles.scss';

const FlightSearchCard = props => {
  const {
    airline,
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    departureAirportCode,
    arrivalAirportCode,
    price,
    flightId,
    date,
  } = props;
  console.log(props);
  const router = useRouter();

  const select = () => {
    const flightInfo = {
      airline,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      departureAirportCode,
      arrivalAirportCode,
      price,
      flightId,
      startDate: date,
    };
    router.push({
      pathname: '/orderdetail',
      state: { type: PRODUCT_TYPE.FLIGHTS, info: { flightInfo } },
    });
  };

  const airlineImage = () => {
    const logo = AIRLINE_LOGO.find(a => a.name === airline);
    return logo ? logo.url : '';
  };

  return (
    <div className="card FlightSearchCard">
      <div className="columns is-gapless">
        <div className="column">
          <div className="card-content">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <figure className="image container is-96x96">
                  <img src={airlineImage()} alt="Placeholder" />
                </figure>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">
                  {`${formatHourMinute(departureTime)} — ${formatHourMinute(arrivalTime)}`}
                </div>
                <div>{airline}</div>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">{timeDiff(departureTime, arrivalTime)}</div>
                <div>{`${departureAirportCode} — ${arrivalAirportCode}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="card-content has-background-light">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <div className="is-size-7">{`${formatPrice(price / 2)}/pax`}</div>
                <div className="is-size-4 has-text-weight-bold">{formatPrice(price)}</div>
                <button
                  type="submit"
                  className="button is-success FlightSearchCard__select-button"
                  onClick={select}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchCard;
