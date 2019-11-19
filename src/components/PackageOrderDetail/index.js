import React from 'react';
import Divider from '../Divider';
import { formatHourMinute, timeDiff, formatPrice, dayDiff } from '../../util/display';

const hotelStar = count => {
  const stars = [...Array(parseInt(count, 10))].map(() => (
    <i className="fas fa-star has-text-warning" />
  ));
  return <div>{stars}</div>;
};

const FlightDetailView = props => {
  const {
    title,
    airline,
    departureCity,
    departureAirportCode,
    arrivalCity,
    arrivalAirportCode,
    startDate,
    departureTime,
    arrivalTime,
  } = props;
  return (
    <div>
      <p className="is-size-6 has-text-weight-bold">{title}</p>
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
    </div>
  );
};

const HotelDetailView = props => {
  const { address, city, hotelName, rate, roomType, startDate, endDate, duration } = props;
  return (
    <div>
      <div className="has-text-weight-bold">{hotelName}</div>
      <div>{hotelStar(rate)}</div>
      <div>{`${address}, ${city}`}</div>
      <br />
      <div className="has-text-weight-bold">{`${startDate}`}</div>
      <div>2 Guests</div>
      <div>{`${duration} day(s), 1 Room (${roomType} type)`}</div>
    </div>
  );
};

const PackageOrderDetail = props => {
  const { packageDetail, flightDetail, flightDetailReturn, hotelDetail } = props;
  const { durationDays } = packageDetail;
  const {
    airline,
    departureCity,
    departureTime,
    departureAirportCode,
    arrivalCity,
    arrivalTime,
    arrivalAirportCode,
    price: flightPrice,
    startDate: flightStartDate,
  } = flightDetail;

  const {
    airline: airlineReturn,
    departureCity: departureCityReturn,
    departureTime: departureTimeReturn,
    departureAirportCode: departureAirportCodeReturn,
    arrivalCity: arrivalCityReturn,
    arrivalTime: arrivalTimeReturn,
    arrivalAirportCode: arrivalAirportCodeReturn,
    price: flightPriceReturn,
    startDate: flightStartDateReturn,
  } = flightDetailReturn;

  const {
    address,
    city,
    hotelName,
    price: hotelPrice,
    rate,
    roomType,
    startDate: hotelStartDate,
    endDate: hotelEndDate,
  } = hotelDetail;

  return (
    <div>
      <p className="title">Flight Detail</p>
      <Divider color="dark" />
      <br />
      <FlightDetailView
        title="Flight 1"
        airline={airline}
        departureCity={departureCity}
        departureAirportCode={departureAirportCode}
        arrivalCity={arrivalCity}
        arrivalAirportCode={arrivalAirportCode}
        startDate={flightStartDate}
        departureTime={departureTime}
        arrivalTime={arrivalTime}
      />
      <br />
      <FlightDetailView
        title="Flight 2"
        airline={airlineReturn}
        departureCity={departureCityReturn}
        departureAirportCode={departureAirportCodeReturn}
        arrivalCity={arrivalCityReturn}
        arrivalAirportCode={arrivalAirportCodeReturn}
        startDate={flightStartDateReturn}
        departureTime={departureTimeReturn}
        arrivalTime={arrivalTimeReturn}
      />
      <br />
      <p className="title">Hotel Detail</p>
      <Divider color="dark" />
      <br />
      <HotelDetailView
        address={address}
        city={city}
        hotelName={hotelName}
        rate={rate}
        roomType={roomType}
        startDate={hotelStartDate}
        endDate={hotelEndDate}
        duration={durationDays}
      />
      <br />
      <Divider color="dark" />
      <br />
      <div className="is-size-4">Price</div>
      <table className="table is-fullwidth">
        <tbody>
          <tr>
            <td>Flight 1, Adult (x2)</td>
            <td align="right">{formatPrice(flightPrice)}</td>
          </tr>
          <tr>
            <td>Flight 2, Adult (x2)</td>
            <td align="right">{formatPrice(flightPriceReturn)}</td>
          </tr>
          <tr>
            <td>{`Hotel, ${durationDays} Day(s)`}</td>
            <td align="right">{formatPrice(hotelPrice * durationDays)}</td>
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
              {formatPrice(flightPrice + flightPriceReturn + hotelPrice * durationDays)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PackageOrderDetail;
