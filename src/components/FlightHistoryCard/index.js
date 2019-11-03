import React from 'react';
import { useRouter } from '../../util/router';
import { formatPrice } from '../../util/display';
import { PRODUCT_TYPE } from '../../data/constants';

const FlightHistoryCard = props => {
  const {
    arrivalAirportCode,
    arrivalCity,
    date,
    departureAirportCode,
    departureCity,
    orderId,
    price,
  } = props;

  const router = useRouter();

  const select = () => {
    router.push({
      pathname: `/myorders/flight/${orderId}`,
      state: { orderId, orderType: PRODUCT_TYPE.FLIGHTS },
    });
  };

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="columns is-gapless">
        <div className="column">
          <div className="card-content">
            <div className="columns is-vcentered">
              <div className="column">
                <div className="has-text-weight-bold">{`Order ID ${orderId}`}</div>
                <div>{date}</div>
              </div>
              <div className="column">
                <div>{`${departureCity} — ${arrivalCity}`}</div>
                <div>{`${departureAirportCode} — ${arrivalAirportCode}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow has-background-light">
          <div className="card-content">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <div className="is-size-4 has-text-weight-bold">{formatPrice(price)}</div>
                <button
                  type="submit"
                  className="button is-info"
                  style={{ marginTop: '1rem' }}
                  onClick={select}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHistoryCard;
