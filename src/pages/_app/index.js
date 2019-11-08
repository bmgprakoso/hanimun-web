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
import AlternateSection from '../../components/AlternateSection';

function App() {
  return (
    <ProvideAuth>
      <Router>
        {/* <Navbar color="primary" spaced logo="http://tinyimg.io/i/HpHHvBy.png" /> */}
        <Navbar color="primary" spaced logo="http://tinyimg.io/i/GRA2VCo.png" />
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

          <Route exact path="/myorders/flight/:id" component={MyOrderDetailPage} />

          <Route exact path="/myorders/hotel/:id" component={MyOrderDetailPage} />

          <Route component={() => <AlternateSection pageNotFound />} />
        </Switch>

        <Divider color="light" />
        <Footer
          color="footer"
          logo="http://tinyimg.io/i/HpHHvBy.png"
          description="Hanimun is a free and inspirational global travel search site for your honeymoon occasion"
          copyright="© Hanimun"
        />
      </Router>
    </ProvideAuth>
  );
}

export default App;
