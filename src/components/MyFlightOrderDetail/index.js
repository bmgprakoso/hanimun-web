import React from 'react';
import Divider from '../Divider';
import { formatHourMinute, timeDiff } from '../../util/display';

const MyFlightOrderDetail = props => {
  const {
    orderId,
    titleFirstPassenger,
    titleSecondPassenger,
    nameFirstPassenger,
    nameSecondPassenger,
    departureCity,
    departureAirportCode,
    arrivalCity,
    arrivalAirportCode,
    date,
    departureTime,
    arrivalTime,
  } = props.data;

  return (
    <div>
      <div className="has-text-weight-bold">{`Order ID ${orderId}`}</div>
      <br />
      <div>{`${titleFirstPassenger} ${nameFirstPassenger}`}</div>
      <div>{`${titleSecondPassenger} ${nameSecondPassenger}`}</div>
      <br />
      <Divider color="light" />
      <br />
      <div className="has-text-weight-bold">{`${departureCity} (${departureAirportCode}) → ${arrivalCity} (${arrivalAirportCode})`}</div>
      <br />
      <div className="has-text-weight-bold">{date}</div>
      <div className="columns is-vcentered">
        <div className="column">
          <div>{formatHourMinute(departureTime)}</div>
          <div>{departureAirportCode}</div>
        </div>
        <div className="column">
          <div>{timeDiff(departureTime, arrivalTime)}</div>
          <div>Direct</div>
        </div>
        <div className="column">
          <div>{formatHourMinute(arrivalTime)}</div>
          <div>{arrivalAirportCode}</div>
        </div>
      </div>
    </div>
  );
};

export default MyFlightOrderDetail;
