import React from "react";
import { TopBar } from "./components/TopBar";
import { Home, ShortestPathVisual} from "./pages";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route  
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    minHeight: 'calc(100vh - 64px)',
  },
  home: {
    margin: 'auto',
    width: '100%'
  }
}));
function App() {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <Router>
        <Box className={classes.homeContainer}>
        <Switch>
          <Route path="/shortest-path-visual">
            <ShortestPathVisual />
          </Route>
          <Route path="/">
            <Box className={classes.home}>
              <Home />              
            </Box>
          </Route>          
        </Switch>
        </Box>
      </Router>
    </>
  );
}

export default App;
