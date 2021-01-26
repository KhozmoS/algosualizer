import React from "react";
import { TopBar } from "./components/TopBar";
import { Home, ShortestPathVisual } from "./pages";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  HashRouter
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
    <HashRouter basename='/'>
      <>
        <TopBar />
        <Router>
          <Box className={classes.home}>
            <Route exact path="/" component={Home} />
          </Box>
          <Route path="/shortest-path-visual" component={ShortestPathVisual} />          
        </Router>
      </>
    </HashRouter>
  );
}

export default App;
