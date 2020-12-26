import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { ShortestPathNodeProps } from "../models/ShortestPathNodeProps";
import { ShortestPathNode } from "../components";
const { ROWS, COLS } = { ROWS: 25, COLS: 50 } as { ROWS: number, COLS: number };
const START_ROW = 12;
const START_COL = 15;
const FINISH_ROW = 12;
const FINISH_COL = 40;

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

export function ShortestPathVisual() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [grid, setGrid] = React.useState([] as ShortestPathNodeProps[][]);
  const [mouseIsDown, setMouseIsDown] = React.useState(false);

  React.useEffect(() => {
    console.log("HERE");
    setGrid(initGrid());
  }, []);
  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setAge(event.target.value as string);
  };
  function handleMouseDown(row: number, col: number) {
    console.log("mouse down");
    setMouseIsDown(true);
    setGrid(updateGridSwapWall(row, col, grid));
  }
  function handleMouseUp() {
    console.log("mouse up");
    setMouseIsDown(false);    
  }
  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsDown) return;
    setGrid(updateGridSwapWall(row, col, grid));
    console.log("mouse enter");
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
  
}


function initGrid() {
  const g = [] as ShortestPathNodeProps[][];
  for (let i = 0; i < ROWS; ++i)
  {
    let row = [] as ShortestPathNodeProps[];
    for (let j = 0; j < COLS; ++j)
    {
      row.push({
        row: i,
        col: j,
        isStart: i === START_ROW && j === START_COL,
        isFinish: i === FINISH_ROW && j === FINISH_COL
      } as ShortestPathNodeProps)
    }
    g.push(row);
  }
  return g;
}
function updateGridSwapWall(row: number, col: number, grid: ShortestPathNodeProps[][]) {
  const newGrid = grid.slice();
  if (!grid[row][col].isFinish && !grid[row][col].isStart) {
    newGrid[row][col] = {
      ...grid[row][col],
      isWall: !grid[row][col].isWall
    };
  }
  return newGrid;
}