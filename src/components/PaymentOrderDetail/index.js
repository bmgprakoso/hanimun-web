/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Divider from '../Divider';
import './styles.scss';

const PaymentOrderDetail = () => {
  return (
    <div>
      <p className="title">Payment Detail</p>
      <Divider color="dark" />
      <br />
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="tel" placeholder="Credit Card Number" />
          <span className="icon is-small is-left">
            <i className="fas fa-credit-card" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Card Holder Name" />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </p>
      </div>
      <div className="field is-grouped">
        <p className="control is-expanded has-icons-left">
          <input className="input" type="month" placeholder="Valid Until" />
          <span className="icon is-small is-left">
            <i className="fas fa-calendar" />
          </span>
        </p>
        <p className="control is-expanded has-icons-left">
          <input className="input" type="tel" placeholder="CVC/CVV" />
          <span className="icon is-small is-left">
            <i className="fas fa-key" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentOrderDetail;
