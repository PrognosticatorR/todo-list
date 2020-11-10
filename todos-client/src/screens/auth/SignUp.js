import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

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
      onSuccess: () => history.push("/todos"),
   });

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
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           variant='outlined'
                           required
                           fullWidth
                           id='email'
                           label='Email Address'
                           name='email'
                           autoComplete='email'
                           onChange={e => handleChange("email", e.target.value)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           variant='outlined'
                           required
                           fullWidth
                           name='password'
                           label='Password'
                           type='password'
                           id='password'
                           autoComplete='current-password'
                           onChange={e => handleChange("password", e.target.value)}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     color='primary'
                     className={classes.submit}>
                     Sign Up
                  </Button>
                  <Grid container justify='flex-end'>
                     <Grid item>
                        <Link href='/'>Already have an account? Sign in</Link>
                     </Grid>
                  </Grid>
               </form>
            </div>
         </Container>
      </Layout>
   );
}
