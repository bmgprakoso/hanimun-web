import React, { useState, useEffect } from 'react';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import PackageSearchBar from '../PackageSearchBar';
import PackageSearchCard from '../PackageSearchCard';
import AlternateSection from '../AlternateSection';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import './styles.scss';

const PackageSearchResult = props => {
  const { query } = props;
  const { cityCode, startDate } = query;

  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_PACKAGE_SEARCH_RESULT}?cityCode=${cityCode}`,
    );
    res
      .json()
      .then(r => {
        const resultsData = r.data.map(e => {
          return {
            city: e.city,
            durationInDays: e.durationInDays,
            durationInNights: e.durationInNights,
            packageDescription: e.packageDescription,
            packageId: e.packageId,
            packageName: e.packageName,
            price: e.price,
            rate: e.rate,
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
    fetchData();
  }, [query]);

  const generatePackageSearchResults = () =>
    results.map(r => (
      <div className="column is-4-desktop is-12-mobile">
        <PackageSearchCard
          city={r.city}
          durationInDays={r.durationInDays}
          durationInNights={r.durationInNights}
          packageDescription={r.packageDescription}
          packageId={r.packageId}
          packageName={r.packageName}
          price={r.price}
          rate={r.rate}
        />
      </div>
    ));

  const showResult = () => {
    if (isError) {
      return <AlternateSection error />;
    }

    if (isEmpty) {
      return <AlternateSection empty />;
    }

    return generatePackageSearchResults();
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Search Result" size={2} />
        <PackageSearchBar cityCode={cityCode} startDate={startDate} />
        <br />
        <div className="columns is-multiline is-mobile">{showResult()}</div>
      </div>
    </Section>
  );
};

export default PackageSearchResult;
