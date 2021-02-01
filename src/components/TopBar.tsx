import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Toolbar, AppBar } from '@material-ui/core';
import { ThemePicker } from "./ThemePicker";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  logo: {
    width: 55,
  }
}));

export function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h4" className={classes.title}>
            ALGOSUALIZER
          </Typography>
          <Box style={{ float: "right" }}>
            <ThemePicker />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}