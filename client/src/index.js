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
import ReceipePage from './components/Receipe/ReceipePage';
import { CircularProgress } from '@material-ui/core'
import { GET_CURRENT_USER } from './queries';
import AddRecipe from './components/Receipe/AddRecipe';

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

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) return <div>Error...</div>
  return (
    <Router>
      <Navbar session={data} />
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/signin' render={() => <Signin refetch={refetch} />} />
        <Route path='/signup' render={() => <Signup refetch={refetch} />}/>

        <Route exact path='/receipes/new' component={AddRecipe} />
        <Route path='/receipes/:receipeId' component={ReceipePage} />
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