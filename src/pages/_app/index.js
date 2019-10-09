import React from 'react';
import Navbar from "./../../components/Navbar";
import { Router } from "./../../util/router.js";
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

        {/* <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch> */}
      </Router>
    </ProvideAuth>
  );
}

export default App;
