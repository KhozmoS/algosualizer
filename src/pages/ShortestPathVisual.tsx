import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { ShortestPathNodeProps, Point } from "../models";
import { ShortestPathNode } from "../components";
import { RunBfs } from "../utilities/algorithms/bfs";
import { gridStore } from "../store";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    background: theme.palette.primary.light,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  const [age, setAge] = React.useState('');  
  const [mouseIsDown, setMouseIsDown] = React.useState(false);
  const [startSelected, setStartSelected] = React.useState(false);
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
  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setAge(event.target.value as string);
  };
  function handleMouseDown(row: number, col: number) {
    setMouseIsDown(true);
    if (grid[row][col].isStart) {
      setStartSelected(true);
    } else {
      grid[row][col].isWall = true;
    }
    gridStore.setGrid(grid);
  }
  function handleMouseUp() {
    setMouseIsDown(false);
    setStartSelected(false);
  }
  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsDown) return;
    if (startSelected) {
      if (start) grid[start.x][start.y].isStart = false;
      grid[row][col].isStart = true;
      gridStore.setStart({x: row, y: col});
    } else {
      grid[row][col].isWall = true;
    }
    gridStore.setGrid(grid);
  }
  function handleRunAlgo() {
    const [visitedNodes, pathNodes] = RunBfs(grid, start, finish);
    visitedNodes.forEach((node, index) => {      
      setTimeout(() => { 
        grid[node.row][node.col].isWall = false;
        grid[node.row][node.col].isVisited = true;
        gridStore.setGrid(grid);
        if (index+1 === visitedNodes.length) {
          paintSolutionPath(pathNodes);
        }
      }, index*10);
    });
  }
  function renderRow(row: ShortestPathNodeProps[]) {
    return row.map((props, index) => {
      return (        
        <ShortestPathNode
          key={index}
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
        <FormControl variant="outlined" className={classes.formControl} size="small">
          <InputLabel id="demo-simple-select-outlined-label">Algorithm</InputLabel>
          <Select            
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Algorithm"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Box textAlign="center" padding={2}>
          <Button variant="contained" color="primary" onClick={() => handleRunAlgo()}>
            Start BFS
          </Button>
        </Box>
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
    path.forEach((node, index) => {    
      setTimeout(() => {
        grid[node.row][node.col].isVisited = false;
        grid[node.row][node.col].isWall = false;
        grid[node.row][node.col].isInPath = true;
        gridStore.setGrid(grid);
      }, index*10)    
    });
  }
}