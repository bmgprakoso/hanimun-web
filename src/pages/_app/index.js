import React from 'react';
import Navbar from '../../components/Navbar';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
import ForgotpassPage from '../forgotpass';
import SearchResultPage from '../searchresult';
import HomePage from '../home';
import SigninPage from '../signin';
import SignupPage from '../signup';
import { Route, Router, Switch } from '../../util/router';
import { ProvideAuth } from '../../util/auth';
import './styles.scss';
import OrderDetailPage from '../orderdetail';
import MyOrdersPage from '../myorders';
import MyOrderDetailPage from '../myorderdetail';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Navbar color="primary" spaced logo="http://tinyimg.io/i/HpHHvBy.png" />

        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route exact path="/hotels" component={HomePage} />

          <Route exact path="/packages" component={HomePage} />

          <Route exact path="/signin" component={SigninPage} />

          <Route exact path="/signup" component={SignupPage} />

          <Route exact path="/forgotpass" component={ForgotpassPage} />

          <Route exact path="/searchresult" component={SearchResultPage} />

          <Route exact path="/orderdetail" component={OrderDetailPage} />

          <Route exact path="/myorders" component={MyOrdersPage} />

          <Route exact path="/myorders/:id" component={MyOrderDetailPage} />

          <Route
            component={({ location }) => {
              return (
                <div
                  style={{
                    padding: '50px',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  The page
                  <code>{location.pathname}</code>
                  could not be found.
                </div>
              );
            }}
          />
        </Switch>

        <Divider color="light" />
        <Footer
          color="white"
          logo="http://tinyimg.io/i/HpHHvBy.png"
          description="Hanimun is a free and inspirational global travel search site for your honeymoon occasion"
          copyright="© Hanimun"
        />
      </Router>
    </ProvideAuth>
  );
}

export default App;
