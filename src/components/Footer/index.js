import React from 'react';
import Section from '../Section';
import { Link } from '../../util/router';
import './styles.scss';

function Footer(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="FooterComponent__container container">
        <div className="columns">
          <div className="column is-5 is-4-widescreen">
            <Link className="brand" to="/">
              <div className="brand-icon">
                <img className="FooterComponent__logo" src={props.logo} alt="Logo" />
              </div>
            </Link>

            {props.description && (
              <p className="FooterComponent__description">{props.description}</p>
            )}

            {props.copyright && <p className="FooterComponent__copywrite">{props.copyright}</p>}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Footer;
