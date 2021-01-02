import { ShortestPathNodeProps } from "../../models";

const stepX = [0, 1, 0, -1];
const stepY = [1, 0, -1, 0];

let visitedNodes = [] as ShortestPathNodeProps[];
let pathNodes = [] as ShortestPathNodeProps[];
type Point = { x: number, y: number };

export function RunBfs(grid:ShortestPathNodeProps[][], start: Point, end: Point) {
  visitedNodes = [];
  pathNodes = [];
  const visited = getEmptyBooleanArray(grid.length, grid[0].length);
  const parentsMatrix = getEmptyParentMatrix(grid.length, grid[0].length);
  const queue = [] as ShortestPathNodeProps[];

  queue.push(grid[start.x][start.y]);  
  visited[start.x][start.y] = true;
  while(queue.length > 0) {
    const node = queue.shift() as ShortestPathNodeProps;    
    for (let i = 0; i < 4; i++) {
      const nwX = node.row + stepX[i];
      const nwY = node.col + stepY[i];
      if (isValidMove(nwX, nwY, grid, visited)) {
        queue.push(grid[nwX][nwY]);
        visited[nwX][nwY] = true;
        // WE DONT INCLUDE START NODE IN PARENT MATRIX
        parentsMatrix[nwX][nwY] = (node.row === start.x && node.col === start.y ? null : node);
        if (nwX === end.x && nwY === end.y) {
          setSolutionPath(parentsMatrix, end);
          return [visitedNodes, pathNodes];
        }
        visitedNodes.push(grid[nwX][nwY]);
      }
    }
  }
  return [visitedNodes, pathNodes];
}


const getEmptyBooleanArray = (rows: number, cols: number) => {
  const visited = [] as boolean[][];
  for (let i = 0; i < rows; i++) {
    let row = [] as boolean[];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    visited.push(row);
  }
  return visited;
}
const getEmptyParentMatrix = (rows: number, cols: number) => {
  const parentMatrix = [] as (ShortestPathNodeProps| null)[][];
  for (let i = 0; i < rows; i++) {
    let row = [] as (ShortestPathNodeProps | null)[];
    for (let j = 0; j < cols; j++) {
      row.push(null);
    }
    parentMatrix.push(row);
  }
  return parentMatrix;
}
const isValidMove = (
    x: number, 
    y: number, 
    grid: ShortestPathNodeProps[][],
    visited: boolean[][]
  ): boolean => {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return false;
  if (visited[x][y]) return false;  
  if (grid[x][y].isWall) return false;
  
  return true;
}
const setSolutionPath = (parentsMatrix: (ShortestPathNodeProps| null)[][], tmp: Point) => {  
  while(parentsMatrix[tmp.x][tmp.y] !== null) {
    const parentNode = parentsMatrix[tmp.x][tmp.y] as ShortestPathNodeProps;
    pathNodes.unshift(parentNode);
    tmp.x = parentNode.row as number;
    tmp.y = parentNode.col as number;
  }
}