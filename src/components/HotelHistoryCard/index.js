import React from 'react';
import { useRouter } from '../../util/router';
import { formatPrice } from '../../util/display';

const HotelHistoryCard = props => {
  const {
    address,
    checkinDate,
    checkoutDate,
    city,
    duration,
    hotelName,
    hotelOrderId,
    price,
    rate,
    roomType,
  } = props;

  const router = useRouter();

  const hotelStar = () => {
    const stars = [...Array(parseInt(rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  const select = () => {
    router.push({
      pathname: `/myorders/hotel/${hotelOrderId}`,
      state: { orderId: hotelOrderId, orderType: 'HTL' },
    });
  };

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="columns is-gapless">
        <div className="column">
          <div className="card-content">
            <div className="columns is-vcentered">
              <div className="column">
                <div className="has-text-weight-bold">{`Order ID ${hotelOrderId}`}</div>
                <div>{hotelName}</div>
                <div>{hotelStar()}</div>
                <div>{`${address}, ${city}`}</div>
              </div>
              <div className="column">
                <div>{`${checkinDate} — ${checkoutDate}`}</div>
                <div>2 Guests</div>
                <div>{`${duration} day(s), 1 Room (${roomType} type)`}</div>
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

export default HotelHistoryCard;
