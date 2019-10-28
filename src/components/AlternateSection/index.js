import React from 'react';
import errorImage from '../../assets/images/error.png';
import emptyImage from '../../assets/images/empty.png';
import loadingImage from '../../assets/images/loading.png';

const AlternateSection = props => {
  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <figure className="image container is-96x96">
          {props.error && <img src={errorImage} alt="errorImage" />}
          {props.empty && <img src={emptyImage} alt="emptyImage" />}
          {props.loading && <img src={loadingImage} alt="loadingImage" />}
        </figure>
        <div>
          <p className="has-text-centered">
            {props.error && 'Sorry, there was a problem in our system. Please try again later.'}
            {props.empty && 'No results found.'}
            {props.loading && 'Please wait.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlternateSection;