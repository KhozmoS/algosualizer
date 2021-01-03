import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ShortestPathNodeProps } from "../../models";
import { gridStore } from "../../store";
import './ShortestPathNode.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  node: {
    width: 25,
    height: 25,
    outline: `thin solid ${theme.palette.secondary.main}`,
    fontSize: 7.5,
    textAlign: "center",
  }
}));

export function ShortestPathNode(props: ShortestPathNodeProps) {
  const [isStart, setIsStart] = React.useState(props.isStart);
  const [isFinish, setIsFinish] = React.useState(props.isFinish);
  const [isWall, setIsWall] = React.useState(props.isWall);
  const [isVisited, setIsVisited] = React.useState(props.isVisited);
  const [isInPath, setIsInPath] = React.useState(props.isInPath);
  const [weigth, setWeigth] = React.useState(props.weigth);
  React.useEffect(() => {
    const subs = gridStore.$grid.subscribe((item) => {
      if (item) {
        setIsStart(item[props.row][props.col].isStart);
        setIsFinish(item[props.row][props.col].isFinish);
        setIsWall(item[props.row][props.col].isWall);
        setIsVisited(item[props.row][props.col].isVisited);
        setIsInPath(item[props.row][props.col].isInPath);
        setWeigth(item[props.row][props.col].weigth);
      }
    });
    return () => {
      if (subs)
        subs.unsubscribe();
    };
  })


  const classes = useStyles();
  const extraClass = (isStart ? 'node-start' : 
                      isFinish ? 'node-end' : 
                      isWall ? 'node-wall' : 
                      isVisited ? 'node-visited' : 
                      isInPath ? 'node-solution' : '');
  return (
    <td      
      id={`node-${props.row}-${props.col}`}
      className={`${classes.node} ${extraClass}`}
      onMouseDown={(e) => { e.preventDefault(); props.onMouseDownEvent(props.row, props.col); }}
      onMouseEnter={(e) => { e.preventDefault(); props.onMouseEnterEvent(props.row, props.col); }}
      onMouseUp={(e) => { e.preventDefault(); props.onMouseUpEvent();}}
    >
      {weigth && !isWall && !isStart && !isFinish ? weigth : ''}
    </td>
  );
}