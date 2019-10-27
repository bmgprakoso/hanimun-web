/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import FlightOrderDetail from '../../components/FlightOrderDetail';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import './styles.scss';
import CustomerOrderDetail from '../../components/CustomerOrderDetail';
import PaymentOrderDetail from '../../components/PaymentOrderDetail';
import { useRouter } from '../../util/router';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../../components/AlternateSection';

const OrderDetailPage = props => {
  const router = useRouter();

  const [productData, setProductData] = useState({});
  const [isShowModal, setIsShowModal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchData() {
    const { id, date } = props.location.state;
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_FLIGHT_DETAIL}?flightId=${id}&date=${date}`,
    );
    res
      .json()
      .then(r => {
        const data = r.data[0];
        setProductData(r.data[0]);
        if (!data) {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const checkout = () => {
    setIsShowModal(true);
  };
  const done = () => {
    router.push('/myorders');
  };

  const showProductOrder = () => {
    if (isLoading) {
      return <AlternateSection empty />;
    }

    if (isError) {
      return <AlternateSection error />;
    }

    return <FlightOrderDetail data={productData} />;
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Order Detail" size={2} />
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">{showProductOrder}</div>
          </div>
          <div className="tile is-8 is-vertical is-parent">
            <div className="tile is-child box">
              <CustomerOrderDetail />
            </div>
            <div className="tile is-child box">
              <PaymentOrderDetail />
            </div>
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-narrow">
            <button type="submit" className="button is-primary is-centered" onClick={checkout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      {isShowModal && (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content">
            <div className="box">
              <p className="has-text-weight-bold has-text-centered is-size-4">Thank You</p>
              <br />
              <span className="OrderDetail__success-icon has-text-success">
                <i className="fas fa-3x fa-check-circle" />
              </span>
              <br />
              <p className="has-text-centered">Your order has been paid successfully</p>
              <br />
              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button type="button" className="button is-primary" onClick={done}>
                    Go To My Order
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default OrderDetailPage;
