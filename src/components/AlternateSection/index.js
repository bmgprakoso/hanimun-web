import React from 'react';
import errorImage from '../../assets/images/error.png';
import emptyImage from '../../assets/images/empty.png';
import loadingImage from '../../assets/images/loading.png';
import pageNotFoundImage from '../../assets/images/pageNotFoundImage.png';

const AlternateSection = props => {
  const { error, empty, loading, pageNotFound } = props;
  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <figure className="image container is-96x96">
          {error && <img src={errorImage} alt="errorImage" />}
          {empty && <img src={emptyImage} alt="emptyImage" />}
          {loading && <img src={loadingImage} alt="loadingImage" />}
          {pageNotFound && <img src={pageNotFoundImage} alt="pageNotFoundImage" />}
        </figure>
        <div>
          <p className="has-text-centered">
            {error && 'Sorry, there was a problem in our system. Please try again later.'}
            {empty && 'No results found.'}
            {loading && 'Please wait.'}
            {pageNotFound && 'Sorry, the page you are looking for cannot be found.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlternateSection;
