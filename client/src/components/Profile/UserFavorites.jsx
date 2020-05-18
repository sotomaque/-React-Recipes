import React from 'react'
import RecipeGrid from '../Receipe/RecipeGrid'
import { Typography } from '@material-ui/core'

const UserFavorites = ({ favorites }) => {
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
            <Typography variant="h6">Favorties</Typography>
        </div>
        <div style={{ paddingBottom: "20px" }}>
            <RecipeGrid recipes={favorites} />
        </div>
        </>
    )
}

export default UserFavorites
