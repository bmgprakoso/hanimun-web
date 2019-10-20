import React from 'react';
import { useRouter } from '../../util/router';
import './styles.scss';

const MyOrderCard = () => {
  const router = useRouter();

  const select = () => {
    router.push('/myorders/1');
  };

  return (
    <div className="card FlightSearchCard">
      <div className="card-content">
        <div className="has-text-weight-bold">Order ID 12345</div>
        <br />
        <div className="columns">
          <div className="column is-narrow">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
          </div>
          <div className="column">
            <div className="has-text-weight-bold">Saturday, 19 October 2019</div>
            <div className="has-text-weight-bold">4:00 pm — 11:44 pm</div>
            <div>United Airlines</div>
          </div>
          <div className="column">
            <div className="has-text-weight-bold">4h 44m</div>
            <div>Jakarta (HLP) ‐ Surabaya (SUR)</div>
          </div>
          <div className="column is-narrow" style={{ textAlign: 'right' }}>
            <div className="is-size-4 has-text-weight-bold">320,000 IDR</div>
            <br />
            <button type="submit" className="button is-primary" onClick={select}>
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
