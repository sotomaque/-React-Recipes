import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Restaurant from "@material-ui/icons/Restaurant";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CircularProgress } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CURRENT_USER, ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";

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
}));

const AddRecipe = () => {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const [username, setUsername] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const [
    addRecipe,
    { loading: loadingMutation, error: errorMutation },
  ] = useMutation(ADD_RECIPE, { errorPolicy: "all" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRecipe({
      variables: {
        name,
        description,
        category,
        instructions,
        username,
      },
      refetchQueries: [
          { query: GET_ALL_RECIPES }
      ]
    }).then((data) => {
      console.log("recipe added: ", data);
      setName('');
      setDescription('');
      setCategory('');
      setInstructions('');
      history.push('/')
    });
  };

  React.useEffect(() => {
    if (!loading && data.getCurrentUser) {
      setUsername(data.getCurrentUser.username);
    }
  }, [data, loading]);

  React.useEffect(() => {
    if (
      name.trim() !== "" &&
      category.trim() !== "" &&
      description.trim() !== "" &&
      instructions.trim() !== "" &&
      username.trim() !== "" &&
      !loading && !loadingMutation
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, category, description, instructions, username, loading, loadingMutation]);


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

  if (error) return <div>Error...</div>
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
