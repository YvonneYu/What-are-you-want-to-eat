import React from 'react';
import Layout from './components/Layout/Layout.js';
import RestaurantsBuilder from './containers/RestaurantsBuilder/RestaurantsBuilder';
import ChoicesPanelBuilder from './containers/ChoicesPanelBuilder/ChoicesPanelBuilder';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Route path="/" exact component={ RestaurantsBuilder }></Route>
          <Route path="/create-rest" exact component={ ChoicesPanelBuilder }></Route>
        </Layout>
      </div>
      <div className={ 'is-loading ' + (props.isLoading && 'is-visible') }>
        <div className="sp sp-circle"></div>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
    isLoading: state.restaurantList.isLoading
  }
);

export default connect(mapStateToProps)(App);
