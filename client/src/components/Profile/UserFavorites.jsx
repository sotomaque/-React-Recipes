import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import RecipeGrid from '../Receipe/RecipeGrid'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    heading: {
      paddingTop: '4em',
    },
}));

const UserFavorites = ({ favorites, username }) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.heading}>
                <Typography gutterBottom variant="h4" component="h2">My Favorites</Typography>
            </div>
            <div style={{ paddingBottom: "20px" }}>
                <RecipeGrid recipes={favorites} username={username} />
            </div>
        </>
    )
}

export default UserFavorites
