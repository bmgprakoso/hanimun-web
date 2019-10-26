import React from 'react';
import { useRouter } from '../../util/router';
import { formatHourMinute, formatPrice, timeDiff } from '../../util/display';
import './styles.scss';

const FlightSearchCard = props => {
  const router = useRouter();

  const select = () => {
    router.push('/orderdetail');
  };

  return (
    <div className="card FlightSearchCard">
      <div className="card-content">
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
          </div>
          <div className="column">
            <div className="has-text-weight-bold">{`${formatHourMinute(props.departureTime)} — ${formatHourMinute(props.arrivalTime)}`}</div>
            <div>{props.airline}</div>
          </div>
          <div className="column">
            <div className="has-text-weight-bold">
              {timeDiff(props.departureTime, props.arrivalTime)}
            </div>
            <div>{`${props.departureAirportCode} — ${props.arrivalAirportCode}`}</div>
          </div>
          <div className="column is-narrow">
            <div className="is-size-7 is-pulled-right">{`${formatPrice(props.price)}/pax`}</div>
            <div className="is-size-4 has-text-weight-bold">{formatPrice(props.price * 2)}</div>
            <button
              type="submit"
              className="button is-primary is-pulled-right FlightSearchCard__select-button"
              onClick={select}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchCard;
