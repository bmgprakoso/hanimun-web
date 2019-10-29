/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer } from 'react';
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
                name={props.name}
                value={props.value}
                className="input"
                type="text"
                placeholder={props.placeholder}
                onChange={props.onChange}
              />
            </p>
          </div>
          {props.help && <p className="help">{props.help}</p>}
          {props.error && <p className="help is-danger">{props.error}</p>}
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

  const validate = (name, value) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    const validPhone = RegExp(/^\d+$/);
    switch (name) {
      case 'firstCustomerName':
      case 'secondCustomerName':
        setError({ [name]: value.length >= 5 ? '' : 'Full Name must be 5 characters long.' });
        return value.length >= 5;
      case 'email':
        setError({ [name]: validEmailRegex.test(value) ? '' : 'Email is not valid.' });
        return validEmailRegex.test(value);
      case 'phone':
        setError({ [name]: validPhone.test(value) ? '' : 'Phone is not valid.' });
        return validPhone.test(value);
      default:
        return false;
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setUserInput({ [name]: value });
    console.log(userInput);
    if (validate(name, value)) {
      props.onUserInputChange(userInput);
    }
  };

  return (
    <div>
      <p className="title">Customer Detail</p>
      <Divider color="dark" />
      <br />
      <form>
        <Field
          label="Customer 1"
          name="firstCustomerName"
          value={userInput.firstCustomerName}
          onChange={handleChange}
          addon="Mr."
          placeholder="Full Name"
          error={error.firstCustomerName}
        />
        <Field
          name="firstCustomerIDNumber"
          value={userInput.firstCustomerIDNumber}
          onChange={handleChange}
          placeholder="ID Card Number"
          error={error.firstCustomerIDNumber}
        />
        <Field
          label="Customer 2"
          name="secondCustomerName"
          value={userInput.secondCustomerName}
          onChange={handleChange}
          addon="Mrs."
          placeholder="Full Name"
          error={error.secondCustomerName}
        />
        <Field
          name="secondCustomerIDNumber"
          value={userInput.secondCustomerIDNumber}
          onChange={handleChange}
          placeholder="ID Card Number"
          error={error.secondCustomerIDNumber}
        />
        <Field
          label="Phone"
          name="phone"
          value={userInput.phone}
          onChange={handleChange}
          addon="+62"
          placeholder="Phone Number"
          help="Do not enter the first zero."
          error={error.phone}
        />
        <Field
          label="Email"
          name="email"
          value={userInput.email}
          onChange={handleChange}
          placeholder="Email Address"
          error={error.email}
        />
      </form>
    </div>
  );
};

export default CustomerOrderDetail;
