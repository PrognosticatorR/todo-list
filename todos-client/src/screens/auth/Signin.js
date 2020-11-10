import React, { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import useRequest from "../../hooks/useRequest";
import Layout from "../../components/Layout";

const useStyles = makeStyles(theme => ({
   paper: {
      display: "flex",
      marginTop: theme.spacing(8),
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%",
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function SignInComponent() {
   const classes = useStyles();
   const history = useHistory();
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");

   const handleChange = (type, value) => {
      if (type === "email") {
         setemail(value);
      } else {
         setpassword(value);
      }
   };

   const [authenticated, setAuthenticated] = useState(false);
   const { doRequest, errors } = useRequest({
      url: "/users/signin",
      method: "post",
      body: {
         email,
         password,
      },
      onSuccess: () => {
         history.push("/", authenticated);
      },
   });

   const handleSubmit = async event => {
      event.preventDefault();
      let res = await doRequest();
      console.log(res);
   };
   // const handleSubmit = async e => {
   //    e.preventDefault();
   //    const data = { email, password };

   //    const res = await signin(data);
   //    console.log(res);
   //    if (res.error) console.log(res);
   //    else {
   //       // authenticate(res.data, () => {
   //       //     if (isAuth() || isAuth().role === 1) {
   //       //         history.push('/');
   //       //     }
   //       // });
   //    }
   // };
   return (
      <Layout>
         <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Sign in
               </Typography>
               <form onSubmit={handleSubmit} className={classes.form} noValidate>
                  <TextField
                     variant='outlined'
                     margin='normal'
                     required
                     fullWidth
                     id='email'
                     label='Email Address'
                     name='email'
                     autoComplete='email'
                     onChange={e => handleChange("email", e.target.value)}
                     autoFocus
                  />
                  <TextField
                     variant='outlined'
                     margin='normal'
                     required
                     fullWidth
                     name='password'
                     label='Password'
                     type='password'
                     id='password'
                     onChange={e => handleChange("password", e.target.value)}
                     autoComplete='current-password'
                  />
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
                     Sign In
                  </Button>
                  <Grid container>
                     <Grid item>
                        <Link to='/signup' variant='body2'>
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </form>
            </div>
         </Container>
      </Layout>
   );
}
