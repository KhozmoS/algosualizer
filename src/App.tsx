import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { Home, ShortestPathVisual } from "./pages";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    minHeight: 'calc(100vh - 64px)',
  },
  home: {
    margin: 'auto',
    width: '100%'
  }
}));
const App = () => {
  const classes = useStyles();
  return (
    <HashRouter basename="/">
      <Box>
        <TopBar />
        <Box className={classes.home}>
          <Route exact path="/" component={Home} />
        </Box>
        <Route path="/shortest-path-visual" component={ShortestPathVisual} />
      </Box>
    </HashRouter>
  );
}

export default App;