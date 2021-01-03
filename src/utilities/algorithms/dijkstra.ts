import { ShortestPathNodeProps, Point } from "../../models";
import { getEmptyParentMatrix, initCostToInfinite, isValidMove, getSolutionPath } from "./shared";
const stepX = [0, 1, 0, -1];
const stepY = [1, 0, -1, 0];

let visitedNodes = [] as ShortestPathNodeProps[];
let pathNodes = [] as ShortestPathNodeProps[];

export function RunDijkstra(grid:ShortestPathNodeProps[][], start: Point, end: Point) {
  pathNodes = [];
  visitedNodes = [];
  const cost = initCostToInfinite(grid.length, grid[0].length);
  const parentsMatrix = getEmptyParentMatrix(grid.length, grid[0].length);
  const queue = [] as ShortestPathNodeProps[];
  queue.push(grid[start.x][start.y]);
  cost[start.x][start.y] = 0;
  while(queue.length > 0) {
    const node = queue.shift() as ShortestPathNodeProps;
    for (let i = 0; i < 4; i++) {
      const nwX = node.row + stepX[i];
      const nwY = node.col + stepY[i];
      // console.log(cost[node.row][node.col] + grid[nwX][nwY].weigth);
      if (
          isValidMove(nwX, nwY, grid) && 
          cost[node.row][node.col] + grid[nwX][nwY].weigth < cost[nwX][nwY]
        ) {
        cost[nwX][nwY] = cost[node.row][node.col] + grid[nwX][nwY].weigth;
        // console.log(grid[nwX][nwY].weigth);
        queue.push(grid[nwX][nwY]);        
        // WE DONT INCLUDE START NODE IN PARENT MATRIX
        parentsMatrix[nwX][nwY] = (node.row === start.x && node.col === start.y ? null : node);        
        visitedNodes.push(grid[nwX][nwY]);
      }
    }
  }  
  pathNodes = getSolutionPath(parentsMatrix, end);
  return [visitedNodes, pathNodes];
}