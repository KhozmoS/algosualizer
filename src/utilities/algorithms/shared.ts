import { ShortestPathNodeProps, Point } from "../../models";

export const getEmptyBooleanArray = (rows: number, cols: number) => {
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
export const getEmptyParentMatrix = (rows: number, cols: number) => {
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
export const getSolutionPath = (
    parentsMatrix: (ShortestPathNodeProps| null)[][], 
    tmp: Point
  ) => {
  const pathNodes = [] as ShortestPathNodeProps[];
  while(parentsMatrix[tmp.x][tmp.y] !== null) {
    const parentNode = parentsMatrix[tmp.x][tmp.y] as ShortestPathNodeProps;
    pathNodes.unshift(parentNode);
    tmp.x = parentNode.row as number;
    tmp.y = parentNode.col as number;
  }
  return pathNodes;
}
export const isValidMove = (
    x: number, 
    y: number, 
    grid: ShortestPathNodeProps[][],
    visited?: boolean[][]
  ): boolean => {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return false;
  if (visited && visited[x][y]) return false;
  if (grid[x][y].isStart || grid[x][y].isFinish) return true;
  if (grid[x][y].isWall) return false;
  
  return true;
}
export const initCostToInfinite = (rows: number, cols: number) => {
  const cost = [];
  for (let i = 0; i < rows; i++) {
    let row = [] as number[];
    for (let j = 0; j < cols; j++)
      row.push(10000000000);
    cost.push(row);
  }
  return cost;
}