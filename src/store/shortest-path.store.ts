import { BehaviorSubject } from 'rxjs';
import { ShortestPathNodeProps } from "../models";
import { Point } from "../models";
const { ROWS, COLS } = { ROWS: 25, COLS: 50 } as { ROWS: number, COLS: number };
const START_ROW = 12;
const START_COL = 10;
const FINISH_ROW = 12;
const FINISH_COL = 40;
const start = new BehaviorSubject<Point>({x: START_ROW, y: START_COL});
const finish = new BehaviorSubject<Point>({x: FINISH_ROW, y: FINISH_COL});
const grid = new BehaviorSubject<ShortestPathNodeProps[][]>(initGrid());

export const gridStore = {
  initGrid,
  randomGridWeigths,
  $grid: grid.asObservable(),
  $start: start.asObservable(),
  $finish: finish.asObservable(),
  setGrid: (newGrid: ShortestPathNodeProps[][]) => grid.next(newGrid),
  setStart: (newStart: Point) => start.next(newStart),
  setFinish: (newFinish: Point) => finish.next(newFinish)
};


function initGrid() {
  start.next({ x: START_ROW, y: START_COL });
  finish.next({ x: FINISH_ROW, y: FINISH_COL });
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
        isFinish: i === FINISH_ROW && j === FINISH_COL,
        weigth: 0
      } as ShortestPathNodeProps)
    }
    g.push(row);
  }
  return g;
}
function randomGridWeigths() {
  start.next({ x: START_ROW, y: START_COL });
  finish.next({ x: FINISH_ROW, y: FINISH_COL });
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
        isFinish: i === FINISH_ROW && j === FINISH_COL,
        weigth: Math.floor(Math.random() * 99) + 1
      } as ShortestPathNodeProps)
    }
    g.push(row);
  }
  return g;
}