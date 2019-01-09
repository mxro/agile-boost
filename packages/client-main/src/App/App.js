import React, { Component } from 'react';
import './App.css';

import { ApolloProvider } from "react-apollo";

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route } from 'react-router-dom';

import ApolloClient from "apollo-boost";
import { About, Home } from 'client-components';

import { Signup } from 'client-auth';
import Cookies from 'js-cookie';

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
    const cookies = {
      get: (name) => Cookies.get(name),
      set: (name, value, path = '/') => Cookies.set(name, value, path)
    }
    return (
      <ApolloProvider client={client}>

        <BrowserRouter>
          <div className="App">
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/signup" component={About} />
            <Route path="/register" render={(props) => <div><Signup {...props} cookies={cookies}></Signup></div>} />
          </div>
        </BrowserRouter>

      </ApolloProvider >
    );
  }
}

export default App;
