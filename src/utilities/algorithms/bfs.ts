import { ShortestPathNodeProps } from "../../models";
import { getEmptyBooleanArray, isValidMove, getEmptyParentMatrix, getSolutionPath } from "./shared";
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
          pathNodes = getSolutionPath(parentsMatrix, end);
          return [visitedNodes, pathNodes];
        }
        visitedNodes.push(grid[nwX][nwY]);
      }
    }
  }
  return [visitedNodes, pathNodes];
}