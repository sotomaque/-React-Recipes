import React from "react";
import { Grid } from "@material-ui/core";

import ReceipeItem from './ReceipeItem';

const RecipeGrid = ({ recipes, username }) => {

    if (recipes) {
        return (
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ paddingLeft: "10%", paddingRight: "10%" }}
            >
                {recipes.map((receipe, index) => (
                    <Grid item key={receipe._id} xs={12} md={6} lg={3}>
                        <ReceipeItem receipe={receipe} username={username} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return <div>Loading...</div>

};

export default RecipeGrid;
