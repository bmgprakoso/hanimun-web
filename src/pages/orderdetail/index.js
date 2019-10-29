/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useReducer } from 'react';
import FlightOrderDetail from '../../components/FlightOrderDetail';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import './styles.scss';
import Divider from '../../components/Divider';
import PaymentOrderDetail from '../../components/PaymentOrderDetail';
import { useRouter } from '../../util/router';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../../components/AlternateSection';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const validPhone = RegExp(/^\d+$/);

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
                onChange={e => props.onChange(e.target.value)}
              />
            </p>
          </div>
          {props.help && <p className="help">{props.help}</p>}
          {props.error && <p className="help is-danger">{props.error.message}</p>}
        </div>
      </div>
    </div>
  );
};

const OrderDetailPage = props => {
  const router = useRouter();

  // fetch data
  const [productData, setProductData] = useState({});
  const [isShowModal, setIsShowModal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // inputs
  const [firstCustomerName, setFirstCustomerName] = useState('');
  const [secondCustomerName, setSecondCustomerName] = useState('');
  const [firstCustomerIDNumber, setFirstCustomerIDNumber] = useState('');
  const [secondCustomerIDNumber, setSecondCustomerIDNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // errors
  const errors = [];
  const [showErrorHelp, setShowErrorHelp] = useState(false);

  const getError = field => {
    return errors.find(e => e.field === field);
  };

  const isEmpty = val => val.trim() === '';

  if (isEmpty(firstCustomerName)) {
    errors.push({
      field: 'firstCustomerName',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(firstCustomerIDNumber)) {
    errors.push({
      field: 'firstCustomerIDNumber',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(secondCustomerName)) {
    errors.push({
      field: 'secondCustomerName',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(secondCustomerIDNumber)) {
    errors.push({
      field: 'secondCustomerIDNumber',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(phone)) {
    errors.push({
      field: 'phone',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(email)) {
    errors.push({
      field: 'email',
      message: "This field can't be empty",
    });
  }

  if (firstCustomerName.length < 5) {
    errors.push({
      field: 'firstCustomerName',
      message: 'Full Name must be 5 characters long.',
    });
  }

  if (secondCustomerName.length < 5) {
    errors.push({
      field: 'secondCustomerName',
      message: 'Full Name must be 5 characters long.',
    });
  }

  if (!validPhone.test(phone)) {
    errors.push({
      field: 'phone',
      message: 'Phone is not valid.',
    });
  }

  if (!validEmailRegex.test(email)) {
    errors.push({
      field: 'email',
      message: 'Email is not valid.',
    });
  }

  async function fetchData() {
    const { id, date } = props.location.state;
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_FLIGHT_DETAIL}?flightId=862&date=${date}`,
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
    if (errors.length) {
      setShowErrorHelp(true);
    } else {
      setIsShowModal(true);
    }
  };
  const done = () => {
    setIsShowModal(false);
    // router.push('/myorders');
  };

  if (isLoading) {
    return (
      <Section>
        <div className="container OrderDetail__alternate-view">
          <AlternateSection loading />
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <div className="container OrderDetail__alternate-view">
          <AlternateSection error />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Order Detail" size={2} />
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <FlightOrderDetail data={productData} />
            </div>
          </div>
          <div className="tile is-8 is-vertical is-parent">
            <div className="tile is-child box">
              <div>
                <p className="title">Customer Detail</p>
                <Divider color="dark" />
                <br />
                <div>
                  <Field
                    label="Customer 1"
                    name="firstCustomerName"
                    value={firstCustomerName}
                    onChange={value => setFirstCustomerName(value)}
                    addon="Mr."
                    placeholder="Full Name"
                    error={showErrorHelp && getError('firstCustomerName')}
                  />
                  <Field
                    name="firstCustomerIDNumber"
                    value={firstCustomerIDNumber}
                    onChange={value => setFirstCustomerIDNumber(value)}
                    placeholder="ID Card Number"
                    error={showErrorHelp && getError('firstCustomerIDNumber')}
                  />
                  <Field
                    label="Customer 2"
                    name="secondCustomerName"
                    value={secondCustomerName}
                    onChange={value => setSecondCustomerName(value)}
                    addon="Mrs."
                    placeholder="Full Name"
                    error={showErrorHelp && getError('secondCustomerName')}
                  />
                  <Field
                    name="secondCustomerIDNumber"
                    value={secondCustomerIDNumber}
                    onChange={value => setSecondCustomerIDNumber(value)}
                    placeholder="ID Card Number"
                    error={showErrorHelp && getError('secondCustomerIDNumber')}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    value={phone}
                    onChange={value => setPhone(value)}
                    addon="+62"
                    placeholder="Phone Number"
                    help="Do not enter the first zero."
                    error={showErrorHelp && getError('phone')}
                  />
                  <Field
                    label="Email"
                    name="email"
                    value={email}
                    onChange={value => setEmail(value)}
                    placeholder="Email Address"
                    error={showErrorHelp && getError('email')}
                  />
                </div>
              </div>
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
