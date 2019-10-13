import React from 'react';
import Navbar from "./../../components/Navbar";
import Divider from "./../../components/Divider";
import Footer from "./../../components/Footer";
import ForgotpassPage from "./../forgotpass";
import HomePage from "./../home";
import SigninPage from "./../signin";
import SignupPage from "./../signup";
import { Route, Router, Switch } from "./../../util/router.js";
import { ProvideAuth } from '../../util/auth';
import './styles.scss';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar
          color="primary"
          spaced
          logo="https://uploads.divjoy.com/logo-white.svg"
        />

        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route exact path="/signin" component={SigninPage} />

          <Route exact path="/signup" component={SignupPage} />

          <Route exact path="/forgotpass" component={ForgotpassPage} />

          <Route
            component={({ location }) => {
              return (
                <div
                  style={{
                    padding: "50px",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  The page <code>{location.pathname}</code> could not be
                  found.
                </div>
              );
            }}
          />
        </Switch>

        <Divider color="light" />
        <Footer
          color="white"
          size="medium"
          logo="https://uploads.divjoy.com/logo.svg"
          description="A short description of what you do here"
          copyright="© Company Name"
        />
      </Router>
    </ProvideAuth>
  );
}

export default App;
