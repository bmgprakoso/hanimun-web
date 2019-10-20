import React from 'react';
import FlightOrderDetail from '../../components/FlightOrderDetail';
import Section from '../../components/Section';
import './styles.scss';
import CustomerOrderDetail from '../../components/CustomerOrderDetail';

const OrderDetailPage = () => {
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
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-narrow">
            <button
              type="submit"
              className="button is-primary is-centered"
              // onClick={select}
            >
              Continue To Payment
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default OrderDetailPage;
