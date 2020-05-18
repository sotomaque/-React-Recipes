import React from 'react';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_RECIPES } from '../../queries';
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
    console.log(userRecipes)

    return (
        <>
            {
                userRecipes.length === 0  ? (
                    <div
                        style={{
                        paddingTop: "50px",
                        paddingBottom: "30px",
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                        <Typography variant="h6">You Don't Have Any Recipes... Yet</Typography>
                    </div>
                ) : (
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
                            <RecipeGrid recipes={userRecipes} username={username} />
                        </div>
                    </>
                )
            }
            
        </>
    )
}

export default UserRecipes
