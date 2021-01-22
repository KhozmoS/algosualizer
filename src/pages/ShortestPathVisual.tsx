import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  Theme,
  IconButton
} from '@material-ui/core';
import { Refresh } from "@material-ui/icons";
import { ShortestPathNodeProps, Point, Algorithm } from "../models";
import { ShortestPathNode } from "../components";
import { RunBfs, RunDijkstra } from "../utilities/algorithms";
import { gridStore } from "../store";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    background: theme.palette.primary.light,
  },
  formControl: {
    minWidth: 200,
    backgroundColor: "#ffffff"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    borderSpacing: 0
  }
}));

let grid = gridStore.initGrid() as ShortestPathNodeProps[][];
export function ShortestPathVisual() {
  const classes = useStyles();
  const [blocked, setBlocked] = React.useState(false);
  const [algo, setAlgo] = React.useState<Algorithm>(Algorithm.BFS);
  const [mouseIsDown, setMouseIsDown] = React.useState(false);
  const [startSelected, setStartSelected] = React.useState(false);
  const [finishSelected, setFinishSelected] = React.useState(false);
  const [start, setStart] = React.useState<Point>({ x: 0, y: 0 });
  const [finish, setFinish] = React.useState<Point>({ x: 0, y: 0 });

  React.useEffect(() => {
    grid = gridStore.initGrid();
    gridStore.setGrid(grid);
    return () => {
      gridStore.setGrid(gridStore.initGrid());
    }
  }, []);
  React.useEffect(() => {
    const subs = gridStore.$start.subscribe((start) => {
      setStart(start);
    });
    return () => {
      if (subs)
        subs.unsubscribe();
    };
  }, []);
  React.useEffect(() => {
    const subs = gridStore.$finish.subscribe((finish) => {
      setFinish(finish);
    });
    return () => {
      if (subs)
        subs.unsubscribe();
    };
  }, []);
  function reestartGrid(v: Algorithm) {
    if (v === Algorithm.DIJKSTRA) {
      grid = gridStore.randomGridWeigths();
      gridStore.setGrid(grid);
    } else {
      grid = gridStore.initGrid();
      gridStore.setGrid(grid);
    }    
  }
  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const v = event.target.value;
    setAlgo(v as Algorithm);    
    reestartGrid(v as Algorithm);
  };
  function handleMouseDown(row: number, col: number) {
    if (blocked) return;
    setMouseIsDown(true);
    if (grid[row][col].isStart) {
      setStartSelected(true);
    } else if (grid[row][col].isFinish) {
      setFinishSelected(true);
    } else {
      grid[row][col].isWall = true;
    }
    gridStore.setGrid(grid);
  }
  function handleMouseUp() {
    setMouseIsDown(false);
    setStartSelected(false);
    setFinishSelected(false);
  }
  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsDown) return;
    if (startSelected && !grid[row][col].isFinish) {
      if (start) grid[start.x][start.y].isStart = false;
      grid[row][col].isStart = true;
      gridStore.setStart({x: row, y: col});
    } else if (finishSelected && !grid[row][col].isStart) {
      if (finish) grid[finish.x][finish.y].isFinish = false;
      grid[row][col].isFinish = true;
      gridStore.setFinish({x: row, y: col});
    } else {
      grid[row][col].isWall = true;
    }
    gridStore.setGrid(grid);
  }
  function runSelectedAlgo() {
    switch (algo) {
      case Algorithm.BFS:
        return RunBfs(grid, start, finish);
      case Algorithm.DIJKSTRA:
        return RunDijkstra(grid, start, finish);
      default:
        return [[], []];
    }
  }
  function handleRunAlgo() {
    const [visitedNodes, pathNodes] = runSelectedAlgo();
    if (visitedNodes.length === 0) {
      return;
    }
    setBlocked(true);    
    visitedNodes.reduce((prev, node, index) => {
      if (prev[node.row][node.col] === false) {
        setTimeout(() => { 
          grid[node.row][node.col].isWall = false;
          grid[node.row][node.col].isVisited = true;
          gridStore.setGrid(grid);
          if (index+1 === visitedNodes.length) {
            paintSolutionPath(pathNodes);
          }
        }, index*10);
        prev[node.row][node.col] = true;
      } else {
        setTimeout(() => {
          grid[node.row][node.col].isVisited = false;
          grid[node.row][node.col].isReVisited = true;
          gridStore.setGrid(grid);
          if (index+1 === visitedNodes.length) {
            paintSolutionPath(pathNodes);
          }
        }, index*10);
      }
      return prev;
    }, emptyBooleanMatrix(grid.length, grid[0].length));
  }
  function renderRow(row: ShortestPathNodeProps[]) {
    return row.map((props) => {
      return (        
        <ShortestPathNode
          key={`${props.row}-${props.col}`}
          { ...props } 
          onMouseDownEvent={handleMouseDown}
          onMouseEnterEvent={handleMouseEnter}
          onMouseUpEvent={handleMouseUp}
        />         
      )
    })
  }  
  return (
    <Box>
      <Box className={classes.menu}>
        <Grid container>
          <Grid item xs={6}>
            <Box padding={1}>
              <FormControl
                variant="filled" 
                className={classes.formControl} 
                size="small"
              >
                <InputLabel id="algo-select-label">Algorithm</InputLabel>
                <Select
                  labelId="algo-select-label"
                  id="algo-select"
                  value={algo}
                  onChange={handleChange}
                  label="Algorithm"
                  disabled={blocked}
                >
                  <MenuItem value={Algorithm.BFS}>
                    {Algorithm.BFS}
                  </MenuItem>
                  <MenuItem value={Algorithm.DIJKSTRA}>
                    {Algorithm.DIJKSTRA}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box padding={1} style={{textAlign: "right"}}>
              <IconButton 
                disabled={blocked}
                onClick={() => reestartGrid(algo as Algorithm)}
              >
                <Refresh></Refresh>
              </IconButton>
              <Button
                disabled={blocked}
                variant="contained" 
                color="primary" 
                onClick={() => handleRunAlgo()}
              >
                RUN
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <table cellSpacing={0} cellPadding={0} style={{margin: '20px auto'}}>
          <tbody>
            { grid.map((row, index) => {
              return (
                <tr key={index}>
                  { renderRow(row) }
                </tr>
              )
            })}
          </tbody>
        </table>                                    
      </Box>
    </Box>
  );
  function paintSolutionPath(path: ShortestPathNodeProps[]) {
    setBlocked(false);
    path.forEach((node, index) => {
      setTimeout(() => {
        grid[node.row][node.col].isVisited = false;
        grid[node.row][node.col].isReVisited = false;
        grid[node.row][node.col].isWall = false;
        grid[node.row][node.col].isInPath = true;
        gridStore.setGrid(grid);
      }, index*10)
    });
  }
}

const emptyBooleanMatrix = (rows: number, cols: number) => {
  const mk = [] as boolean[][];
  for (let i = 0; i < rows; i++) {
    const row = [] as boolean[];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    mk.push(row);
  }
  return mk;
}