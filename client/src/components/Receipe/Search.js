import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress, Typography } from "@material-ui/core";
import { SEARCH_RECIPES } from "../../queries";


import RecipeGrid from "./RecipeGrid";

const Search = (props) => {
  const searchTerm = props.location.query;
  console.log("qurey in search component", searchTerm);

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
      <div className="heading">
        <Typography variant="h2">{searchTerm}</Typography>
      </div>
      <RecipeGrid recipes={recipes} />
    </div>
  );
};

export default Search;
