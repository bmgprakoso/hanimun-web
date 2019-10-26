import React from 'react';
import Divider from "../Divider";
import './styles.scss';

const FlightOrderDetail = props => {
  const { airline, departureCity, departureTime, departureAirportCode, arrivalCity, arrivalTime, arrivalAirportCode, date, price } = props.data;
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
          <div>09.10</div>
          <div>HLP</div>
        </div>
        <div className="column">
          <div>1h 30m</div>
          <div>Direct</div>
        </div>
        <div className="column">
          <div>10.40</div>
          <div>SUB</div>
        </div>
      </div>
      <Divider color="dark" />
      <br />
      <div className="is-size-4">Price</div>
      <table className="table is-fullwidth">
        <tbody>
          <tr>
            <td>Adult (x2)</td>
            <td align="right">320,000 IDR</td>
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
              320,000 IDR
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlightOrderDetail;
