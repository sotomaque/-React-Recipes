import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_RECIPES } from "../queries";
import { CircularProgress, Typography } from "@material-ui/core";

import RecipeGrid from '../components/Receipe/RecipeGrid';

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: '4em',
    paddingLeft: '10%',
    display: 'flex',
  },
}));

const HomePage = ({ session }) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_ALL_RECIPES);

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
  if (error) return <div>Error</div>;

  const recipes = data.getAllRecipes;

  const username = session?.getCurrentUser?.username;

  return (
    <div className="App">
      <div className={classes.heading}>
        <Typography gutterBottom variant="h4" component="h2">Delicious and Quick Recipes</Typography>
      </div>

      <RecipeGrid recipes={recipes} username={username} />
      
    </div>
  );
};

export default HomePage;
