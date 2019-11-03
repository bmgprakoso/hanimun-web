import React, { useState, useEffect } from 'react';
import { useAuth } from '../../util/auth';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';
import HotelHistoryCard from '../HotelHistoryCard';

const HotelHistory = () => {
  const auth = useAuth();
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_ORDER_HISTORY}?email=${auth.user.email}&orderType=HTL`,
    );
    res
      .json()
      .then(r => {
        const resultsData = r.data.map(e => {
          return {
            address: e.address,
            checkinDate: e.checkinDate,
            checkoutDate: e.checkoutDate,
            city: e.city,
            duration: e.duration,
            hotelName: e.hotelName,
            hotelOrderId: e.hotelOrderId,
            orderId: e.orderId,
            price: e.price,
            rate: e.rate,
            roomType: e.roomType,
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
      <HotelHistoryCard
        address={r.address}
        checkinDate={r.checkinDate}
        checkoutDate={r.checkoutDate}
        city={r.city}
        duration={r.duration}
        hotelName={r.hotelName}
        hotelOrderId={r.hotelOrderId}
        orderId={r.orderId}
        price={r.price}
        rate={r.rate}
        roomType={r.roomType}
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

export default HotelHistory;
