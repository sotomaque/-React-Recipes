import React from "react";
import axios from 'axios';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Restaurant from "@material-ui/icons/Restaurant";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CircularProgress } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CURRENT_USER,
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_USER_RECIPES,
} from "../../queries";

import Error from "../Error";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Enrique Sotomayor {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/featured/?food)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none"
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
}));

const AddRecipe = ({ session }) => {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState("");

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const [
    addRecipe,
    { loading: loadingMutation, error: errorMutation },
  ] = useMutation(ADD_RECIPE, { errorPolicy: "all" });

  const handleImageUpload = async () => {
    // create form data
    const data = new FormData();
    // append the image we have stored in state as a file to data
    data.append("file", image);
    // upload preset is what cloudinary created for us when we
    // enabled unsigned uploading
    data.append("upload_preset", "mibi0rzt");
    // append cloudinary cloud name
    data.append("cloud_name", "dfddbhcyo");

    // make http request with axios
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dfddbhcyo/image/upload",
      data
    );

    return res.data.url
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = await handleImageUpload();
    console.log(url)
    await addRecipe({
      variables: { name, description, category, instructions, username, image: url },
      refetchQueries: [
        { query: GET_ALL_RECIPES },
        { query: GET_USER_RECIPES, variables: { username } },
      ],
    }).then((data) => {
      console.log('in data ', data)
      setName("");
      setDescription("");
      setCategory("");
      setInstructions("");
      setImage('');
      history.push("/");
    });
  };

  // route guard
  React.useEffect(() => {
    if (!session.getCurrentUser) {
      history.push("/");
    }
  }, [session.getCurrentUser, history]);

  // set username effect
  React.useEffect(() => {
    if (!loading && data.getCurrentUser) {
      setUsername(data.getCurrentUser.username);
    }
  }, [data, loading]);

  // button disabled effect
  React.useEffect(() => {
    if (
      name.trim() !== "" &&
      category.trim() !== "" &&
      description.trim() !== "" &&
      instructions.trim() !== "" &&
      username.trim() !== ""
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, category, description, instructions, username]);

  if (loading || loadingMutation) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error...</div>;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Restaurant />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add A New Recipe
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => handleSubmit(event)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
            />

            <FormControl
              className={classes.formControl}
              fullWidth
              variant="outlined"
              required
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                autoWidth={true}
              >
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
                <MenuItem value={"Snack"}>Snack</MenuItem>
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="off"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="instructions"
              label="Instructions"
              name="instructions"
              autoComplete="off"
              multiline
              rows={2}
              rowsMax={4}
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
              autoFocus
            />

            {/* image input  */}
            <input
              accept="image/*"
              id="image"
              type="file"
              className={classes.input}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="image">
              <Button
                style={{ color: image && "green" }}
                component="span"
                size="small"
                className={classes.button}
              >
                <AddAPhotoIcon />>
              </Button>
            </label>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>

            {errorMutation && <Error error={errorMutation} />}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddRecipe;
