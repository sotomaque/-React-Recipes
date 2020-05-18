import React from "react";
import { Grid } from "@material-ui/core";

import ReceipeItem from './ReceipeItem';
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_FAVORITES } from '../../queries'

const RecipeGrid = ({ recipes, username }) => {
    
    const { data, loading, error } = useQuery(GET_USER_FAVORITES);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const favorites = data.getCurrentUser?.favorites;

    if (recipes) {
        return (
            <Grid
                container
                spacing={2}
                style={{ paddingLeft: "10%", paddingRight: "10%" }}
            >
                {recipes.map((receipe, index) => (
                    <Grid item key={receipe._id} xs={12} md={6} lg={3}>
                        <ReceipeItem receipe={receipe} username={username} favorites={favorites} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return <div>Loading...</div>

};

export default RecipeGrid;
