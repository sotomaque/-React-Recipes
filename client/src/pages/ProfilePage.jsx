import React from "react";
import { useHistory } from 'react-router-dom';

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Parallax from "../components/Parallax/Parallax.js";
import UserFavorites from '../components/Profile/UserFavorites';
import UserRecipes from '../components/Profile/UserRecipes';

import styles from "../assets/jss/profilePage.js";


const useStyles = makeStyles(styles);

const ProfilePage = ({ session }) => {
    const classes = useStyles();
    const history = useHistory();

    // route guard 
    React.useEffect(() => {
        if (!session.getCurrentUser) {
            history.push('/')
        }
    }, [session.getCurrentUser])


    if (session && session.getCurrentUser) {
        // destructure username and favorites
        const username = session.getCurrentUser.username;
        const favorites = session.getCurrentUser.favorites;
        
        // format date
        const joinDate = session.getCurrentUser.joinDate;
        const newDate = new Date(joinDate).toLocaleDateString("en-US");
        const newTime = new Date(joinDate).toLocaleTimeString("en-US");
        const formattedDate = `${newDate} at ${newTime}`;

        return (
            <div>
                <Parallax
                    small
                    filter
                    image={require("../assets/img/profile-bg.jpg")}
                />
                <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        {/** PROFILE PIC + USERNAME **/}
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                                <div className={classes.avatarContainer}>
                                <Avatar
                                    aria-label="Profile Picture"
                                    className={classes.avatar}
                                >
                                    {session.getCurrentUser.username.substring(0, 1)}
                                </Avatar>
                                </div>
                                <div className={classes.name}>
                                <Typography variant="h4">
                                    {session.getCurrentUser.username}
                                </Typography>
                                <Typography variant="h6">CHEF</Typography>
                                </div>
                            </div>
                            </GridItem>
                        </GridContainer>

                        {/** JOIN DATE **/}
                        <div className={classes.description}>
                            <p>Joined on: {formattedDate}</p>
                        </div>
                    
                        {/** MY RECIPES **/}
                        <UserRecipes username={username} />

                        {/** FAVORITES **/}
                        <UserFavorites favorites={favorites} />
                    </div>
                </div>
                </div>
            </div>
        );
    }

    return <div>Loading..</div>;
};

export default ProfilePage;
