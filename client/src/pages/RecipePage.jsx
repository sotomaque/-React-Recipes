import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPE } from '../queries';

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Parallax from "../components/Parallax/Parallax.js";

import styles from "../assets/jss/profilePage.js";


const useStyles = makeStyles(styles);

const RecipePage = () => {

    const classes = useStyles();
    const {recipeId} = useParams();
    const { data, loading, error } = useQuery(GET_RECIPE, {
        variables: { _id: recipeId }
    });

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const backgroundImage = data?.getRecipe?.image;

    return (
        <div>
            <Parallax
                small
                filter
                image={backgroundImage ? backgroundImage : require("../assets/img/profile-bg.jpg")}
            />
            <div className={classNames(classes.main, classes.mainRaised)}>
            <div style={{paddingBottom: '30px'}}>
                <div className={classes.container}>
                    {/** PROFILE PIC + USERNAME **/}
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={6}>
                        <div className={classes.profile}>
                            <div className={classes.name}>
                                <Typography variant="h4">
                                    {data.getRecipe.name}
                                </Typography>
                                <Typography variant="h6">
                                    {data.getRecipe.category}
                                </Typography>
                            </div>
                        </div>
                        </GridItem>
                    </GridContainer>

                    {/** JOIN DATE **/}
                    <div className={classes.description} style={{paddingBottom: '30px'}}>
                        <p>{data.getRecipe.description}</p>
                    </div>

                    <div className="instructions">
                        <div>
                            <Typography gutterBottom variant="h4" component="h2">Instructions</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" component="h6p">
                            {data.getRecipe.instructions}
                        </Typography>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );

};

export default RecipePage;
