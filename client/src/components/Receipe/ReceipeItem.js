import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from '@material-ui/core/Chip';
import { Badge, Typography, CardActionArea, CardContent } from "@material-ui/core";

import moment from 'moment'

import sampleImage from "../../assets/2.jpg";

import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES, LIKE_RECIPE, UNLIKE_RECIPE, GET_CURRENT_USER, GET_USER_FAVORITES } from '../../queries';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  actions: {
    justifyContent: 'space-between'
  }
}));

const RecipeItem = ({ receipe, username, favorites }) => {
  const classes = useStyles();
  const history = useHistory();
  const [deleteUserRecipe] = useMutation(DELETE_USER_RECIPE);
  const [likeRecipe] = useMutation(LIKE_RECIPE);
  const [unlikeRecipe] = useMutation(UNLIKE_RECIPE);
  const [prevLiked, setPrevLiked] = React.useState(false);

  const handleClick = () => {
    history.push(`/recipes/${receipe._id}`);
  };

  const isUserReceipe = receipe.username === username;
  const likes = receipe.likes;

  const handleDelete = async (_id) => {
    await deleteUserRecipe({
      variables: {
        _id
      },
      refetchQueries: [
        { query: GET_ALL_RECIPES }, 
        { query: GET_USER_RECIPES, variables: { username } },
        { query: GET_USER_FAVORITES }
      ]
    })
  }

  const handleFavorite = async (_id) => {
    if (username) {
      if (!prevLiked) {
        await likeRecipe({
          variables: {
            _id,
            username: username
          },
          refetchQueries: [
            { query: GET_ALL_RECIPES }, 
            { query: GET_CURRENT_USER }
          ]
        }).then(() => {
          setPrevLiked(true)
        }).catch(err => {
          console.error(err)
        })
      } else {
        // unlike
        await unlikeRecipe({
          variables: {
            _id,
            username: username
          },
          refetchQueries: [
            { query: GET_ALL_RECIPES }, 
            { query: GET_CURRENT_USER }
          ]
        }).then(() => {
          setPrevLiked(false)
        }).catch(err => {
          console.error(err)
        })
      }
    } else {
      alert("Please Login to Favorite")
    }
  }

  React.useEffect(() => {
    if (favorites) {
      const liked = favorites.findIndex(favorite => favorite._id === receipe._id);
      if (liked !== -1) {
        setPrevLiked(true)
      }
    }
  }, [])


  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleClick()}>
        <CardMedia
          component="img"
          alt="Recipe Image"
          image={ receipe.image ? receipe.image : sampleImage}
          title="Recipe Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {receipe.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {receipe.description.substring(0,40)}{'...'}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.actions}>
        <IconButton color={prevLiked ? 'secondary' : 'default'} aria-label="add to favorites" onClick={() => handleFavorite(receipe._id)}>
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
