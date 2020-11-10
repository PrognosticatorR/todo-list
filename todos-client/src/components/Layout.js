import Header from "./Navbar";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
   },
   container: {
      minHeight: "100vh",
   },
}));

const Layout = ({ children }) => {
   const classes = useStyles();
   return (
      <div className={classes.container}>
         <Header />
         <Container className={classes.root}>{children}</Container>
      </div>
   );
};

export default Layout;
