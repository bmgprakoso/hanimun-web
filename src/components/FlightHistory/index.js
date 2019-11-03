import React, { useState, useEffect } from 'react';
import MyOrderCard from '../MyOrderCard';
import { useAuth } from '../../util/auth';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';
import FlightSearchCard from '../FlightSearchCard';

const FlightHistory = () => {
  const auth = useAuth();
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_ORDER_HISTORY}?email=${auth.user.email}&orderType=FLG`,
    );
    res
      .json()
      .then(r => {
        const resultsData = r.data.map(e => {
          return {
            arrivalAirportCode: e.arrivalAirportCode,
            arrivalCity: e.arrivalCity,
            date: e.date,
            departureAirportCode: e.departureAirportCode,
            departureCity: e.departureCity,
            flightOrderId: e.flightOrderId,
            orderId: e.orderId,
            price: e.price,
          };
        });
        setResults(resultsData);
        if (resultsData.length === 0) {
          setIsEmpty(true);
        }
      })
      .catch(() => setIsError(true));
  }

  useEffect(() => {
    if (auth.user) {
      fetchData();
    }
  }, [auth.user]);

  const generateResults = () => {
    return results.map(r => (
      // <FlightSearchCard
      //   key={r.orderId}
      //   flightId={r.flightOrderId}
      //   date={r.date}
      //   departureAirportCode={r.arrivalAirportCode}
      //   arrivalAirportCode={r.arrivalAirportCode}
      //   price={r.price}
      // />
      <div>hehe</div>
    ));
  };

  if (isError) {
    return <AlternateSection error />;
  }

  if (isEmpty) {
    return <AlternateSection empty />;
  }

  return <div>{generateResults()}</div>;
};

export default FlightHistory;
