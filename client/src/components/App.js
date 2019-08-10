import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom';

import * as actions from '../actions';
import { connect } from 'react-redux';


import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const NoMatch = (() => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>404 Page</h2>
    </div>
  );
});


class App extends Component {

  componentDidMount()
  {
      this.props.fetchUser();
  }

  render() {

    return (

      <div className="container">
         
        <BrowserRouter>
           
               <Header />
               
               <Switch>
                    <Route exact={true} path="/" component={Landing} />
                    <PrivateRoute authed={this.props.auth} exact={true} path='/surveys' component={Dashboard} />
                    <PrivateRoute authed={this.props.auth} exact={true} path='/surveys/new' component={SurveyNew} />
                    <Route component={NoMatch} />
               </Switch>

        </BrowserRouter>

      </div>

    );

    function PrivateRoute({ component: Component, authed, ...rest }) {
     
      return (
        <Route
          {...rest}
          render={(props) => (authed !== false && authed !== null)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
      )
    }

  }

}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps,actions) (App);
