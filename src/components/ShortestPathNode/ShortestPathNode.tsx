import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ShortestPathNodeProps } from "../../models";
import './ShortestPathNode.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  node: {
    width: 25,
    height: 25,
    outline: `thin solid ${theme.palette.secondary.main}`,    
  }
}));

export function ShortestPathNode(props: ShortestPathNodeProps) {
  const classes = useStyles();
  const extraClass = (props.isStart ? 'node-start' : 
                      props.isFinish ? 'node-end' : 
                      props.isWall ? 'node-wall' : '');
  return (
    <td
      id={`node-${props.row}-${props.col}`}
      className={`${classes.node} ${extraClass}`}
      onMouseDown={() => props.onMouseDownEvent(props.row, props.col)}
      onMouseEnter={() => props.onMouseEnterEvent(props.row, props.col)}
      onMouseUp={() => props.onMouseUpEvent()}
    >
    </td>
  );
}