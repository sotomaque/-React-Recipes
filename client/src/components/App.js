import React from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_RECIPES } from "../queries";
import ReceipeItem from "./Receipe/ReceipeItem";
import { Grid, CircularProgress } from "@material-ui/core";

const App = () => {
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

  return (
    <div className="App">
      <h1>Home</h1>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        style={{paddingLeft: '20px'}}
      >
        {data.getAllRecipes.map((receipe) => (
          <Grid item key={receipe._id} xs={12} md={4} lg={3}>
            <ReceipeItem receipe={receipe} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
