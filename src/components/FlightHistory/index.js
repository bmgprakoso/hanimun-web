import React, { useState, useEffect } from 'react';
import { useAuth } from '../../util/auth';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';
import FlightHistoryCard from '../FlightHistoryCard';

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
      <FlightHistoryCard
        key={r.orderId}
        arrivalAirportCode={r.arrivalAirportCode}
        arrivalCity={r.arrivalCity}
        date={r.date}
        departureAirportCode={r.departureAirportCode}
        departureCity={r.departureCity}
        flightOrderId={r.flightOrderId}
        orderId={r.orderId}
        price={r.price}
      />
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
