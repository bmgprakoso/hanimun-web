import React from 'react';
import { useRouter } from '../../util/router';
import './styles.scss';

const FlightSearchCard = () => {
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
            <div className="has-text-weight-bold">4:00 pm — 11:44 pm</div>
            <div>United Airlines</div>
          </div>
          <div className="column">
            <div className="has-text-weight-bold">4h 44m</div>
            <div>LAS ‐ EWR</div>
          </div>
          <div className="column is-narrow">
            <div className="is-size-7 is-pulled-right">160,000 IDR/pax</div>
            <div className="is-size-4 has-text-weight-bold">320,000 IDR</div>
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
