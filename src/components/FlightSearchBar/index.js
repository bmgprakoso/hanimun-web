import React from "react";
import "./styles.scss";

function FlightSearchBar(props) {

return (
    <div className="columns is-horizontal is-vcentered">
        <div className="column is-full">
            <div className="columns">
                <div className="column">
                    <div className="control is-expanded has-icons-left">
                        <div className="select">
                            <select>
                                <option selected>Country</option>
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div>
                        <div className="icon is-small is-left">
                            <i className="fas fa-plane-departure"></i>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="control is-expanded has-icons-left">
                        <input className="input" type="text" placeholder="To" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-plane-arrival"></i>
                        </span>
                    </div>
                </div>
                <div className="column">
                    <div className="control is-expanded has-icons-left">
                        <input className="input" type="text" placeholder="Date" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-calendar"></i>
                        </span>
                    </div>
                </div>
                <div className="column">
                    <div className="control is-expanded has-icons-left">
                        <input className="input" type="text" placeholder="Class" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user-friends"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="column">
            <button class="button is-primary is-inverted">Search</button>
        </div>
    </div>
        
  );
}

export default FlightSearchBar;
