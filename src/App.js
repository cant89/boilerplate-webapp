import React, { Component } from 'react';
import {Helmet} from "react-helmet";

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Auth from './modules/Auth';
import Header from './modules/Header';

import Content from './pages/Content';

class App extends Component {

  constructor(props){
    super(props);    

    this.state = {};
  }

  render(){   

    return (
      <MuiThemeProvider>
        <Auth>
          <Helmet>
              <title>My project</title>
          </Helmet>
          <Header />
          <Content />
        </Auth>
      </MuiThemeProvider>
    );

  }
}

export default App;
