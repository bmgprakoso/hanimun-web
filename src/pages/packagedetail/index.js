import React, { useState, useEffect } from 'react';
import { useAuth } from '../../util/auth';
import { useRouter } from '../../util/router';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import AlternateSection from '../../components/AlternateSection';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import { formatPrice } from '../../util/display';

const PackageDetailPage = props => {
  const { id, date } = props.location.state;

  const auth = useAuth();
  const router = useRouter();

  const [packageDetail, setPackageDetail] = useState({});
  const [flight, setFlight] = useState({});
  const [hotel, setHotel] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsLoading(true);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_PACKAGE_DETAIL}?id=${id}&startDate=${date}`,
    );
    res
      .json()
      .then(r => {
        const { package: packageData, flightDetail, hotelDetail } = r.data;
        setPackageDetail({
          city: packageData.city,
          description: packageData.description,
          durationDays: packageData.duration_days,
          durationNights: packageData.duration_nights,
          id: packageData.id,
          name: packageData.name,
          price: packageData.price,
          rate: packageData.rate,
          startDate: packageData.startDate,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const packageStar = () => {
    const stars = [...Array(parseInt(packageDetail.rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  const packageSummaryView = () => {
    const {
      city,
      description,
      durationDays,
      durationNights,
      name,
      price,
      startDate,
    } = packageDetail;
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{name}</p>
              <p className="subtitle is-6">{`${city} | ${startDate} | 2 Tamu, 1 Kamar`}</p>
            </div>
          </div>
        </div>
        <div className="card-image">
          <figure className="image is-3by1">
            <img src="https://via.placeholder.com/720x240" alt="package" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="column">
                <div>{`${durationDays} day(s), ${durationNights} night(s)`}</div>
                <div>{description}</div>
                <div>{packageStar()}</div>
              </div>
              <div className="column is-narrow">
                <div>{formatPrice(price)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showContent = () => {
    if (isError) {
      return <AlternateSection error />;
    }

    if (isLoading) {
      return <AlternateSection loading />;
    }

    return <div>{packageSummaryView()}</div>;
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Package Detail" size={2} />
        {showContent()}
      </div>
    </Section>
  );
};

export default PackageDetailPage;
