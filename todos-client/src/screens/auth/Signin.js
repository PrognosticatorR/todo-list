import React, { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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

   const { doRequest, errors } = useRequest({
      url: "/users/signin",
      method: "post",
      body: {
         email,
         password,
      },
      onSuccess: () => {
         history.push("/");
      },
   });
   const showErrors = () => {
      return errors.errors.map(err => <Alert color='error'>{err.message} </Alert>);
   };

   const handleSubmit = async event => {
      event.preventDefault();
      await doRequest();
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
                  Sign in
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
                        Sign In
                     </Button>
                     <Grid container>
                        <Grid item>
                           <Link to='/signup' variant='body2'>
                              {"Don't have an account? Sign Up"}
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
