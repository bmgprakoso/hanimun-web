import React from 'react';
import { useRouter } from '../../util/router';
import { formatDateComplete, formatPrice, dayDiff } from '../../util/display';
import { PRODUCT_TYPE } from '../../data/constants';
import './styles.scss';

const HotelSearchCard = props => {
  const router = useRouter();

  const select = () => {
    router.push({
      pathname: '/orderdetail',
      state: { type: PRODUCT_TYPE.HOTELS, query: { id: props.id } },
    });
  };

  const hotelStar = count => {
    const stars = [...Array(parseInt(count, 10))].map(() => (
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
                  <img src="https://placeholder.pics/svg/300" alt="Placeholder" />
                </figure>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">{props.hotelName}</div>
                <div>{hotelStar(props.rate)}</div>
                <br />
                <div>{props.address}</div>
              </div>
              <div className="column">
                <div className="has-text-weight-bold">
                  {`${dayDiff(props.startDate, props.endDate)} day(s)`}
                </div>
                <div>
                  {`${formatDateComplete(props.startDate)} — ${formatDateComplete(props.endDate)}`}
                </div>
                <br />
                <div>{`Room Type: ${props.roomType}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="card-content has-background-light">
            <div className="columns is-vcentered">
              <div className="column is-narrow">
                <div className="is-size-7">{`${formatPrice(props.price)}/day`}</div>
                <div className="is-size-4 has-text-weight-bold">
                  {formatPrice(props.price * parseInt(dayDiff(props.startDate, props.endDate), 10))}
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
