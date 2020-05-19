import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, Typography } from "@material-ui/core";
import { SEARCH_RECIPES } from "../../queries";


import RecipeGrid from "./RecipeGrid";

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: '4em',
    paddingLeft: '10%',
    display: 'flex',
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const searchTerm = props.location.query;
  const { data, loading, error } = useQuery(SEARCH_RECIPES, {
    variables: { searchTerm },
  });

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

  if (error) {
    return <div>Error...</div>;
  }

  const recipes = data.searchRecipes;

  return (
    <div className="App">
      <div className={classes.heading}>
        <Typography gutterBottom variant="h4" component="h2">{searchTerm ? searchTerm : 'All Recipes'}</Typography>
      </div>
      <RecipeGrid recipes={recipes} />
    </div>
  );
};

export default Search;
