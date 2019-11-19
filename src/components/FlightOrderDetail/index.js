import React from 'react';
import Divider from '../Divider';
import './styles.scss';
import { formatHourMinute, timeDiff, formatPrice } from '../../util/display';

const FlightOrderDetail = props => {
  const {
    airline,
    departureCity,
    departureTime,
    departureAirportCode,
    arrivalCity,
    arrivalTime,
    arrivalAirportCode,
    price,
    startDate,
  } = props.data;

  return (
    <div>
      <p className="title">Flight Detail</p>
      <Divider color="dark" />
      <br />
      <div className="has-text-weight-bold">{`${departureCity} (${departureAirportCode}) → ${arrivalCity} (${arrivalAirportCode})`}</div>
      <div>{airline}</div>
      <br />
      <div className="has-text-weight-bold">{startDate}</div>
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
      <Divider color="dark" />
      <br />
      <div className="is-size-4">Price</div>
      <table className="table is-fullwidth">
        <tbody>
          <tr>
            <td>Adult (x2)</td>
            <td align="right">{formatPrice(price)}</td>
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
              {formatPrice(price)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlightOrderDetail;
