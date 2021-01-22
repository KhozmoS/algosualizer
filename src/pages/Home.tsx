import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { AlgoCard } from "../components";
import shortestImage from "../assets/shortest.png";
import { AlgoCardProps } from "../models";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const algos = [
  {
    image: shortestImage,
    algoName: "Shortest Path",
    docLink: "docs",
    visuaLink: "algosualizer/shortest-path-visual"
  }
] as AlgoCardProps[]

export function Home() {
  const classes = useStyles();
  return (
    <Box padding={10}>
      <Grid container className={classes.root} spacing={2}>
        {algos.map((algo) => (
          <Grid key={algo.algoName} item xs={12} sm={6} md={4} lg={3} className={classes.control}>
            <AlgoCard { ...algo }/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}