import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../actions/auth";
import keyGenerator from "../utils/keyGenerator";

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
   link: {
      color: "white",
      textDecoration: "none",
   },
}));

export default function ButtonAppBar() {
   const classes = useStyles();
   const [currentUser, setCurrentuser] = useState(null);
   useEffect(() => {
      getCurrentUser().then(data => setCurrentuser(data));
   }, []);
   const links = [
      !currentUser && { label: "Sign Up", href: "/signup" },
      !currentUser && { label: "Sign In", href: "/signin" },
      currentUser && { label: "Sign Out", href: "/signout" },
   ]
      .filter(linkConfig => linkConfig)
      .map(({ label, href }) => {
         return (
            <Button color='inherit' key={keyGenerator.getKey()}>
               <Link className={classes.link} to={href}>
                  {label}
               </Link>
            </Button>
         );
      });

   return (
      <div className={classes.root}>
         <AppBar position='static'>
            <Toolbar>
               <Typography variant='h6' className={classes.title}>
                  <Link className={classes.link} to='/'>
                     Todo-App
                  </Link>
               </Typography>
               {links}
            </Toolbar>
         </AppBar>
      </div>
   );
}
