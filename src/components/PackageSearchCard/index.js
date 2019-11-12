/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from '../../util/router';
import { formatPrice } from '../../util/display';

const PackageSearchCard = props => {
  const router = useRouter();

  const { city, durationDays, durationNights, description, id, name, price, rate } = props;

  const packageStar = () => {
    const stars = [...Array(parseInt(rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  const select = () => {
    router.push({
      pathname: `/package/${id}`,
      state: {
        id,
      },
    });
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="has-text-weight-bold">{name}</p>
            <div>{packageStar()}</div>
            <p>{city}</p>
            <p>
              {`${durationDays} day(s), ${durationNights > 0 ? ` ${durationNights} night(s)` : ''}`}
            </p>
          </div>
        </div>

        <div className="content">
          {description}
          <br />
          <br />
          <p className="has-text-weight-bold">{formatPrice(price)}</p>
        </div>
      </div>
      <footer className="card-footer">
        <a onClick={select} className="card-footer-item">
          Select
        </a>
      </footer>
    </div>
  );
};

export default PackageSearchCard;
