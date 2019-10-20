/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import FlightOrderDetail from '../../components/FlightOrderDetail';
import Section from '../../components/Section';
import './styles.scss';
import CustomerOrderDetail from '../../components/CustomerOrderDetail';
import PaymentOrderDetail from '../../components/PaymentOrderDetail';
import { useRouter } from '../../util/router';

const OrderDetailPage = () => {
  const router = useRouter();

  const [isShowModal, setIsShowModal] = useState('');

  const checkout = () => {
    setIsShowModal(true);
  };
  const done = () => {
    router.push('/myorder');
  };

  return (
    <Section>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <FlightOrderDetail />
            </div>
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
