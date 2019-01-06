import React, { Component } from 'react';
import './App.css';

import { ApolloProvider } from "react-apollo";

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import ApolloClient from "apollo-boost";
import About from './../About/About';
import Home from './../Home/Home';

const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>

        <BrowserRouter>
          <div className="App">
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
          </div>
        </BrowserRouter>

      </ApolloProvider >
    );
  }
}

export default App;
