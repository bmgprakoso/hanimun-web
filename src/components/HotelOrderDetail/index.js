import React from 'react';
import Divider from '../Divider';
import { formatDateComplete, formatPrice, dayDiff } from '../../util/display';

const HotelOrderDetail = props => {
  const { address, city, hotelName, price, rate, roomType, startDate, endDate } = props.data;

  const hotelStar = count => {
    const stars = [...Array(parseInt(count, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  return (
    <div>
      <p className="title">Hotel Detail</p>
      <Divider color="dark" />
      <br />
      <div className="has-text-weight-bold">{hotelName}</div>
      <div>{hotelStar(rate)}</div>
      <div>{`${address}, ${city}`}</div>
      <br />
      <div className="has-text-weight-bold">
        {`${formatDateComplete(startDate)} — ${formatDateComplete(endDate)}`}
      </div>
      <div>2 Guests</div>
      <div>{`${dayDiff(startDate, endDate)} day(s), 1 Room (${roomType} type)`}</div>
      <br />
      <Divider color="dark" />
      <br />
      <div className="is-size-4">Price</div>
      <table className="table is-fullwidth">
        <tbody>
          <tr>
            <td>{`${dayDiff(startDate, endDate)} Day(s)`}</td>
            <td align="right">{formatPrice(price * dayDiff(startDate, endDate))}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td align="right">0 IDR</td>
          </tr>
          <tr>
            <td>Service Charge</td>
            <td align="right">0 IDR</td>
          </tr>
          <tr>
            <td className="has-text-weight-bold">Total Payment</td>
            <td align="right" className="has-text-weight-bold">
              {formatPrice(price * dayDiff(startDate, endDate))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HotelOrderDetail;
