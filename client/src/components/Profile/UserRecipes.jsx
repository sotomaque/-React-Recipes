import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_RECIPES } from '../../queries';
import { Typography } from '@material-ui/core';
import RecipeGrid from '../Receipe/RecipeGrid';

const UserRecipes = ({ username }) => {

    const { data, loading, error } = useQuery(GET_USER_RECIPES, {
        variables: { username }
    });
    

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return <div>Error...</div>
    }

    const userRecipes = data.getUserRecipes;

    return (
        <>
            <div
                style={{
                paddingTop: "50px",
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "center",
                }}
            >
                <Typography variant="h6">My Recipes</Typography>
            </div>
            <div style={{ paddingBottom: "20px" }}>
                <RecipeGrid recipes={userRecipes} />
            </div>
        </>
    )
}

export default UserRecipes
