import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ApolloClinet from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';

import { GET_CURRENT_USER } from './queries';

const client = new ApolloClinet({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error')
      console.log(networkError)

      if (networkError.statusCode === 401) {
        localStorage.removeItem('token');
      }
    }
  }
});

const Root = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER);

  console.log(data)
  return (
    <Router>
      <Navbar session={data} />
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/signin' render={() => <Signin refetch={refetch} />} />
        <Route path='/signup' render={() => <Signup refetch={refetch} />}/>
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);