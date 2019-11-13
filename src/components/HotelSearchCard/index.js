import React from 'react';
import { useRouter } from '../../util/router';
import { formatDateComplete, formatPrice, dayDiff } from '../../util/display';
import { PRODUCT_TYPE } from '../../data/constants';
import './styles.scss';

const HotelSearchCard = props => {
  const { hotelName, rate, address, startDate, endDate, roomType, price, roomId } = props;
  const router = useRouter();

  const select = () => {
    router.push({
      pathname: '/orderdetail',
      state: {
        type: PRODUCT_TYPE.HOTELS,
        query: { roomId, startDate, endDate },
      },
    });
  };

  const hotelStar = () => {
    const stars = [...Array(parseInt(rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  return (
    <div className="card FlightSearchCard">
      <div className="columns is-gapless">
        <div className="column">
          <div className="card-content">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <figure className="image container is-96x96">
                  <img
                    src={`https://ui-avatars.com/api/?name=${hotelName.split(' ').join('+')}`}
                    alt="Placeholder"
                  />
                </figure>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">{hotelName}</div>
                <div>{hotelStar()}</div>
                <br />
                <div>{address}</div>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">
                  {`${dayDiff(startDate, endDate)} day(s)`}
                </div>
                <div>{`${formatDateComplete(startDate)} — ${formatDateComplete(endDate)}`}</div>
                <br />
                <div>{`1 Room (${roomType} type)`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="card-content has-background-light">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <div className="is-size-7">{`${formatPrice(price)}/day`}</div>
                <div className="is-size-4 has-text-weight-bold">
                  {formatPrice(price * parseInt(dayDiff(startDate, endDate), 10))}
                </div>
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

export default HotelSearchCard;
