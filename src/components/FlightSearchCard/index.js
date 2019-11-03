import React from 'react';
import { useRouter } from '../../util/router';
import { formatHourMinute, formatPrice, timeDiff } from '../../util/display';
import { AIRLINE_LOGO, PRODUCT_TYPE } from '../../data/constants';
import './styles.scss';

const FlightSearchCard = props => {
  const router = useRouter();

  const select = () => {
    router.push({
      pathname: '/orderdetail',
      state: { type: PRODUCT_TYPE.FLIGHTS, query: { id: props.flightId, date: props.date } },
    });
  };

  const airlineImage = airline => {
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
                  <img src={airlineImage(props.airline)} alt="Placeholder" />
                </figure>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">
                  {`${formatHourMinute(props.departureTime)} — ${formatHourMinute(
                    props.arrivalTime,
                  )}`}
                </div>
                <div>{props.airline}</div>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">
                  {timeDiff(props.departureTime, props.arrivalTime)}
                </div>
                <div>{`${props.departureAirportCode} — ${props.arrivalAirportCode}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="card-content has-background-light">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <div className="is-size-7">{`${formatPrice(props.price)}/pax`}</div>
                <div className="is-size-4 has-text-weight-bold">{formatPrice(props.price * 2)}</div>
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
