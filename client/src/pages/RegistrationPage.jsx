import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_USER } from '../queries'

import Error from '../components/Error';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Enrique Sotomayor{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?food)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegistrationPage = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const [signUpUser, { loading: mutationLoading, error: mutationError }] = useMutation(SIGNUP_USER, { errorPolicy: 'all' });

  const handleSubmit = async (event) => {
      event.preventDefault();
      await signUpUser({
          variables: { username, email, password }
      })
        .then( async ({ data }) => {
            console.log(data);
            console.log(data);
            localStorage.setItem('token', data.signUpUser.token);
            await props.refetch();
            history.push('/');
        })
        .catch(err => {
            console.error('error registering user', err)
        })
  }

  React.useEffect(() => {
    if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
        setIsButtonDisabled(false);
    } else {
        setIsButtonDisabled(true)
    }


  }, [username, email, password]);

  if (mutationLoading) return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    }}>
        <CircularProgress/>
    </div>
  )
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
            <form className={classes.form} noValidate onSubmit={(event) => handleSubmit(event)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete='off'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isButtonDisabled}
                >
                Register
                </Button>
                <Grid container style={{ display: 'flex', justifyContent: 'center'}}>
                <Grid item>
                    <Link to='/login' variant="body2">
                    {"Already have an account? Sign In"}
                    </Link>
                </Grid>
                </Grid>
                <Box mt={5}>
                <Copyright />
                </Box>
                {
                    mutationError && <Error error={mutationError} />
                }
            </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default RegistrationPage;