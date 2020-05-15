import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClinet from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClinet({
  uri: "http://localhost:4444/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);