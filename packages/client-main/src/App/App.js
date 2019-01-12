import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { ApolloProvider } from "react-apollo";

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Route } from 'react-router-dom';

import ApolloClient from "apollo-boost";
import { About} from 'client-components';
import Home from 'client-components/dist/Home/Home';
import MainNavbar from '../MainNavbar/MainNavbar';
import { Signup } from 'client-auth';
import Cookies from 'js-cookie';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});
const defaults = {
  isLoggedIn: false,
  email: null,
  userId: null
};
const resolvers = {};
const typeDefs = ``;
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
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
          <React.Fragment>

            <MainNavbar cookies={cookies}></MainNavbar>
            <div className="App">
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/signup" render={(props) => <div><Signup {...props} cookies={cookies}></Signup></div>} />
            </div>
          </React.Fragment>

        </BrowserRouter>
      </ApolloProvider >
    );
  }
}

export default App;
