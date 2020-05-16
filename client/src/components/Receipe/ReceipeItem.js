import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from '@material-ui/core/Chip';
import moment from 'moment'

import sampleImage from "../../assets/1.jpg";

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

const RecipeItem = ({ receipe }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/receipes/${receipe._id}`);
  };

  const fomattedDate = moment(receipe.createdDate).format('MMMM Do  YYYY')

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
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {receipe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <Chip label={`${receipe.category}`} />
      </CardActions>
      
        
    </Card>
  );
};

export default RecipeItem;
