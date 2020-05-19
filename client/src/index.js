import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ApolloClinet from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import RecipePage from './pages/RecipePage';

import "./assets/scss/material-kit-react.scss";

import Navbar from './components/Navbar';
import { CircularProgress } from '@material-ui/core'
import { GET_CURRENT_USER } from './queries';
import AddRecipe from './components/Receipe/AddRecipe';

import Search from './components/Receipe/Search';

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
          <Route exact path='/' render={() => <HomePage session={data} />} />

          <Route path='/login' render={() => <LoginPage refetch={refetch} />} />
          <Route path='/register' render={() => <RegistrationPage refetch={refetch} />}/>
          <Route path='/profile'  render={() => <ProfilePage session={data} />} />

          <Route exact path='/new' render={() => <AddRecipe session={data} />} />
          <Route path='/recipes/:recipeId' component={RecipePage} />

          <Route path='/search' component={Search} />

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