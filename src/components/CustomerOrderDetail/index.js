/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useReducer } from 'react';
import Divider from '../Divider';
import './styles.scss';

const Field = props => {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        {props.label && <label className="label">{props.label}</label>}
      </div>
      <div className="field-body">
        <div className="field is-expanded">
          <div className={`field${props.addon ? ' has-addons' : ''}`}>
            {props.addon && (
              <p className="control">
                <a className="button is-static">{props.addon}</a>
              </p>
            )}
            <p className="control is-expanded">
              <input
                name="firstCustomerName"
                value={props.value}
                className="input"
                type="text"
                placeholder={props.placeholder}
                onChange={props.onChange}
              />
            </p>
          </div>
          {props.help && <p className="help">{props.help}</p>}
        </div>
      </div>
    </div>
  );
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
        <Field
          label="Customer 1"
          value={userInput.firstCustomerName}
          onChange={handleChange}
          addon="Mr."
          placeholder="Full Name"
        />
        <Field
          value={userInput.firstCustomerIDNumber}
          onChange={handleChange}
          placeholder="ID Card Number"
        />
        <Field
          label="Customer 2"
          value={userInput.secondCustomerName}
          onChange={handleChange}
          addon="Mrs."
          placeholder="Full Name"
        />
        <Field
          value={userInput.secondCustomerIDNumber}
          onChange={handleChange}
          placeholder="ID Card Number"
        />
        <Field
          label="Phone"
          value={userInput.phone}
          onChange={handleChange}
          addon="+62"
          placeholder="Phone Number"
          help="Do not enter the first zero."
        />
        <Field
          label="Email"
          value={userInput.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
      </form>
    </div>
  );
};

export default CustomerOrderDetail;
