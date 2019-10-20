/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Divider from '../Divider';
import './styles.scss';

const CustomerOrderDetail = () => {
  return (
    <div>
      <p className="title">Customer Detail</p>
      <Divider color="dark" />
      <br />
      <div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Customer 1</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="Name" />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label" />
          <div className="field-body">
            <div className="field is-expanded">
              <p className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="ID Card Number" />
                <span className="icon is-small is-left">
                  <i className="fas fa-id-card" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Customer 2</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="Name" />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label" />
          <div className="field-body">
            <div className="field is-expanded">
              <p className="control is-expanded has-icons-left">
                <input className="input" type="text" placeholder="ID Card Number" />
                <span className="icon is-small is-left">
                  <i className="fas fa-id-card" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Phone Number</label>
          </div>
          <div className="field-body">
            <div className="field is-expanded">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">+62</a>
                </p>
                <p className="control is-expanded">
                  <input className="input" type="tel" placeholder="Your phone number" />
                </p>
              </div>
              <p className="help">Do not enter the first zero</p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Email</label>
          </div>
          <div className="field-body">
            <div className="field is-expanded">
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="email" placeholder="Your email" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetail;
