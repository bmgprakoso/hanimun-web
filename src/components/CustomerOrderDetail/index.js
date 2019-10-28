/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer } from 'react';
import Divider from '../Divider';
import './styles.scss';

const CustomerOrderDetail = () => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    firstCustomerName: '',
    firstCustomerIDNumber: '',
    secondCustomerName: '',
    secondCustomerIDNumber: '',
    phone: '',
    email: '',
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setUserInput({ [name]: value });
  };

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
            <div className="field is-expanded">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">Mr.</a>
                </p>
                <p className="control is-expanded">
                  <input
                    name="firstCustomerName"
                    value={userInput.firstCustomerName}
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label" />
          <div className="field-body">
            <div className="field is-expanded">
              <p className="control is-expanded has-icons-left">
                <input
                  name="firstCustomerIDNumber"
                  value={userInput.firstCustomerIDNumber}
                  className="input"
                  type="text"
                  placeholder="ID Card Number"
                  onChange={handleChange}
                />
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
            <div className="field is-expanded">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">Mrs.</a>
                </p>
                <p className="control is-expanded">
                  <input
                    name="secondCustomerName"
                    value={userInput.secondCustomerName}
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label" />
          <div className="field-body">
            <div className="field is-expanded">
              <p className="control is-expanded has-icons-left">
                <input
                  name="secondCustomerIDNumber"
                  value={userInput.secondCustomerIDNumber}
                  className="input"
                  type="text"
                  placeholder="ID Card Number"
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-id-card" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Phone</label>
          </div>
          <div className="field-body">
            <div className="field is-expanded">
              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">+62</a>
                </p>
                <p className="control is-expanded">
                  <input
                    name="phone"
                    value={userInput.phone}
                    className="input"
                    type="tel"
                    placeholder="Your phone number"
                    onChange={handleChange}
                  />
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
                  <input
                    name="email"
                    value={userInput.email}
                    className="input"
                    type="email"
                    placeholder="Your email"
                    onChange={handleChange}
                  />
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
