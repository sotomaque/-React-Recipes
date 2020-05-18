import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from '@material-ui/core/Chip';
import { Badge } from "@material-ui/core";

import moment from 'moment'

import sampleImage from "../../assets/1.jpg";

import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES, LIKE_RECIPE, GET_CURRENT_USER } from '../../queries';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    justifyContent: 'space-between'
  }
}));

const RecipeItem = ({ receipe, username }) => {
  const classes = useStyles();
  const history = useHistory();
  const [deleteUserRecipe] = useMutation(DELETE_USER_RECIPE);
  const [likeRecipe, { data, loading, error }] = useMutation(LIKE_RECIPE);

  const handleClick = () => {
    history.push(`/receipes/${receipe._id}`);
  };

  const isUserReceipe = receipe.username === username;
  const likes = receipe.likes;
  const fomattedDate = moment(receipe.createdDate).format('MMMM Do YYYY');

  const handleDelete = async (_id) => {
    await deleteUserRecipe({
      variables: {
        _id
      },
      refetchQueries: [
        { query: GET_ALL_RECIPES }, 
        { query: GET_USER_RECIPES, variables: { username } }
      ]
    })
  }

  const handleFavorite = async (_id) => {
    if (username) {
      await likeRecipe({
        variables: {
          _id,
          username: username
        },
        refetchQueries: [
          { query: GET_ALL_RECIPES }, 
          { query: GET_CURRENT_USER }
        ]
      }).then((data) => {
        console.log(data)
      }).catch(err => {
        console.error(err)
      })
    } else {
      alert("Please Login to Favorite")
    }
  }

  return (
   
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {receipe.username.substring(0, 1)}
            </Avatar>
          }
          title={`${receipe.name}`}
          subheader={`${fomattedDate}`}
        />  
        <CardMedia
          className={classes.media}
          image={sampleImage}
          title="Paella dish"
        />
        <CardActions disableSpacing className={classes.actions}>
          <IconButton aria-label="add to favorites" onClick={() => handleFavorite(receipe._id)}>
            <Badge color="secondary" badgeContent={likes} >
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <Chip label={`${receipe.category}`} />
          {
            isUserReceipe && (
              <IconButton aria-label="Delete Recipe" onClick={() => handleDelete(receipe._id)}>
                <DeleteIcon />
              </IconButton>
            )
          }
          
        </CardActions>
      </Card>
  );
};

export default RecipeItem;
