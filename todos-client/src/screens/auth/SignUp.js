import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory, Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { getCurrentUser } from "../../actions/auth";

import Layout from "../../components/Layout";
import useRequest from "../../hooks/useRequest";

const useStyles = makeStyles(theme => ({
   paper: {
      marginTop: theme.spacing(8),
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
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function SignUp() {
   const history = useHistory();
   const classes = useStyles();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { doRequest, errors } = useRequest({
      url: "/users/signup",
      method: "post",
      body: {
         email,
         password,
      },
      onSuccess: () => {
         window.location.reload();
         <Redirect to='/' />;
      },
   });

   useEffect(() => {
      getCurrentUser().then(data => {
         if (data) {
            history.push("/");
         }
         console.log(data);
      });
   }, [history]);

   const handleSubmit = async event => {
      event.preventDefault();
      await doRequest();
   };

   const handleChange = (type, value) => {
      if (type === "email") {
         setEmail(value);
      } else if (type === "password") {
         setPassword(value);
      }
   };
   const showErrors = () => {
      return errors.errors.map(err => <Alert color='error'>{err.message} </Alert>);
   };
   return (
      <Layout>
         <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Sign up
               </Typography>
               <form onSubmit={handleSubmit} className={classes.form} noValidate>
                  {errors && showErrors()}
                  <FormGroup>
                     <FormControl
                        // className={classes.margin, classes.textField)}
                        key='1'>
                        <InputLabel htmlFor='email' required>
                           Email Id
                        </InputLabel>
                        <Input
                           required={true}
                           id='standard-required'
                           type='email'
                           value={email}
                           onChange={e => handleChange("email", e.target.value)}
                        />
                     </FormControl>
                     <FormControl key='23'>
                        <InputLabel htmlFor='email' required>
                           Password
                        </InputLabel>
                        <Input
                           required={true}
                           name='password'
                           type='password'
                           id='password'
                           value={password}
                           onChange={e => handleChange("password", e.target.value)}
                        />
                     </FormControl>

                     <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                     />
                     <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}>
                        Sign Up
                     </Button>
                     <Grid container>
                        <Grid item>
                           <Link to='/signup' variant='body2'>
                              {"Already have an account? Sign In"}
                           </Link>
                        </Grid>
                     </Grid>
                  </FormGroup>
               </form>
            </div>
         </Container>
      </Layout>
   );
}
