import React, { Component } from 'react';
import './App.css';

import { ApolloProvider } from "react-apollo";

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import ApolloClient from "apollo-boost";
import About from './../About/About';
import Home from './../Home/Home';

import { Signup } from 'client-auth';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});
const client = new ApolloClient({
 link,
 cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>

        <BrowserRouter>
          <div className="App">
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/signup" component={Signup}></Route>
          </div>
        </BrowserRouter>

      </ApolloProvider >
    );
  }
}

export default App;
