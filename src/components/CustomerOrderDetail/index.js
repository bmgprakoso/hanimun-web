/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useReducer } from 'react';
import Divider from '../Divider';
import './styles.scss';

const Field = props => {
  return <div />;
};

const CustomerOrderDetail = props => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    firstCustomerName: '',
    firstCustomerIDNumber: '',
    secondCustomerName: '',
    secondCustomerIDNumber: '',
    phone: '',
    email: '',
  });

  const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), {
    firstCustomerName: '',
    firstCustomerIDNumber: '',
    secondCustomerName: '',
    secondCustomerIDNumber: '',
    phone: '',
    email: '',
  });

  const [showErrors, setShowErrors] = useState(false);

  const validate = (name, value) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    const validPhone = RegExp(/^\d+$/);
    switch (name) {
      case 'firstCustomerName':
      case 'secondCustomerName':
        setError({ [name]: value.length < 5 ? 'Full Name must be 5 characters long.' : '' });
        break;
      case 'email':
        setError({ [name]: !validEmailRegex.test(value) ? 'Email is not valid.' : '' });
        break;
      case 'phone':
        setError({ [name]: !validPhone.test(value) ? 'Phone is not valid.' : '' });
        break;
      default:
        break;
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    validate(name, value);
    setUserInput({ [name]: value });
  };

  const handleSubmit = () => {
    if (Object.values(error).every(e => e === '')) {
      setShowErrors(true);
    } else if (props.onSubmit) {
      props.onSubmit(userInput);
    }
  };

  return (
    <div>
      <p className="title">Customer Detail</p>
      <Divider color="dark" />
      <br />
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
      </form>
    </div>
  );
};

export default CustomerOrderDetail;
