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
  const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), {
    firstCustomerName: '',
    firstCustomerIDNumber: '',
    secondCustomerName: '',
    secondCustomerIDNumber: '',
    phone: '',
    email: '',
  });
  const [showErrorHelp, setShowErrorHelp] = useState(false);

  const validate = (name, value) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    const validPhone = RegExp(/^\d+$/);
    switch (name) {
      case 'firstCustomerName':
      case 'secondCustomerName':
        setError({ [name]: value.length >= 5 ? '' : 'Full Name must be 5 characters long.' });
        break;
      case 'email':
        setError({ [name]: validEmailRegex.test(value) ? '' : 'Email is not valid.' });
        break;
      case 'phone':
        setError({ [name]: validPhone.test(value) ? '' : 'Phone is not valid.' });
        break;
      default:
        break;
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'firstCustomerName':
        setFirstCustomerName(value);
        break;
      case 'firstCustomerIDNumber':
        setFirstCustomerIDNumber(value);
        break;
      case 'secondCustomerName':
        setSecondCustomerName(value);
        break;
      case 'secondCustomerIDNumber':
        setSecondCustomerIDNumber(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

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
    validate('firstCustomerName', firstCustomerName);
    validate('firstCustomerIDNumber', firstCustomerIDNumber);
    validate('secondCustomerName', secondCustomerName);
    validate('setSecondCustomerIDNumber', secondCustomerIDNumber);
    validate('phone', phone);
    validate('email', email);

    console.log(error);

    if (Object.values(error).every(e => e === '')) {
      setIsShowModal(true);
    } else {
      setShowErrorHelp(true);
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
                    onChange={handleChange}
                    addon="Mr."
                    placeholder="Full Name"
                    error={showErrorHelp && error.firstCustomerName}
                  />
                  <Field
                    name="firstCustomerIDNumber"
                    value={firstCustomerIDNumber}
                    onChange={handleChange}
                    placeholder="ID Card Number"
                    error={showErrorHelp && error.firstCustomerIDNumber}
                  />
                  <Field
                    label="Customer 2"
                    name="secondCustomerName"
                    value={secondCustomerName}
                    onChange={handleChange}
                    addon="Mrs."
                    placeholder="Full Name"
                    error={showErrorHelp && error.secondCustomerName}
                  />
                  <Field
                    name="secondCustomerIDNumber"
                    value={secondCustomerIDNumber}
                    onChange={handleChange}
                    placeholder="ID Card Number"
                    error={showErrorHelp && error.secondCustomerIDNumber}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    addon="+62"
                    placeholder="Phone Number"
                    help="Do not enter the first zero."
                    error={showErrorHelp && error.phone}
                  />
                  <Field
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    error={showErrorHelp && error.email}
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
