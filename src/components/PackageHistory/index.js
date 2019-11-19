import React, { useState, useEffect } from 'react';
import { useAuth } from '../../util/auth';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';
import PackageHistoryCard from '../PackageHistoryCard';

const PackageHistory = () => {
  const auth = useAuth();
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_ORDER_HISTORY}?email=${auth.user.email}&orderType=PCK`,
    );
    res
      .json()
      .then(r => {
        console.log(r);
        const resultsData = r.data.map(e => {
          return {
            city: e.city,
            date: e.date,
            orderId: e.orderId,
            packageName: e.packageName,
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
      <PackageHistoryCard
        city={r.city}
        date={r.date}
        orderId={r.orderId}
        packageName={r.packageName}
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

export default PackageHistory;
