import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_RECIPES } from '../../queries';
import RecipeGrid from '../Receipe/RecipeGrid';

const useStyles = makeStyles((theme) => ({
    heading: {
      paddingTop: '4em',
    },
}));

const UserRecipes = ({ username }) => {

    const classes = useStyles();

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
            {
                userRecipes.length === 0  ? (
                    <div className={classes.heading}>
                        <Typography gutterBottom variant="h4" component="h2">You Don't Have Any Recipes... Yet</Typography>
                    </div>
                ) : (
                    <>
                        <div className={classes.heading}>
                            <Typography gutterBottom variant="h4" component="h2">My Recipes</Typography>
                        </div>
                        <div style={{ paddingBottom: "20px" }}>
                            <RecipeGrid recipes={userRecipes} username={username} />
                        </div>
                    </>
                )
            }
            
        </>
    )
}

export default UserRecipes
