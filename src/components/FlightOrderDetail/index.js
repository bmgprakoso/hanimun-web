import React from 'react';
import Divider from '../Divider';
import './styles.scss';
import { formatHourMinute, timeDiff } from '../../util/display';

const FlightOrderDetail = props => {
  const {
    airline,
    departureCity,
    departureTime,
    departureAirportCode,
    arrivalCity,
    arrivalTime,
    arrivalAirportCode,
    date,
    price,
  } = props.data;

  console.log(props.data);
  return (
    <div>
      <p className="title">Flight Detail</p>
      <Divider color="dark" />
      <br />
      <div className="has-text-weight-bold">{`${departureCity} (${departureAirportCode}) &#x2192; ${arrivalCity} (${arrivalAirportCode})`}</div>
      <div>{airline}</div>
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
      <Divider color="dark" />
      <br />
      <div className="is-size-4">Price</div>
      <table className="table is-fullwidth">
        <tbody>
          <tr>
            <td>Adult (x2)</td>
            <td align="right">{price}</td>
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
              {price}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlightOrderDetail;
