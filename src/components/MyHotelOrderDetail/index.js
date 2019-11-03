import React from 'react';
import Divider from '../Divider';
import { formatHourMinute, timeDiff } from '../../util/display';

const MyHotelOrderDetail = props => {
  const {
    address,
    checkinDate,
    checkoutDate,
    city,
    duration,
    hotelName,
    orderId,
    rate,
    roomType,
  } = props.data;

  const hotelStar = () => {
    const stars = [...Array(parseInt(rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  return (
    <div>
      <div className="has-text-weight-bold">{`Order ID ${orderId}`}</div>
      <br />
      <div>{hotelName}</div>
      <div>{hotelStar()}</div>
      <div>{`${address}, ${city}`}</div>
      <br />
      <Divider color="light" />
      <br />
      <div>{`${checkinDate} — ${checkoutDate}`}</div>
      <div>2 Guests</div>
      <div>{`${duration} day(s), 1 Room (${roomType} type)`}</div>
    </div>
  );
};

export default MyHotelOrderDetail;
