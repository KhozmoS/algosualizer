import { Subject } from 'rxjs';
import { ShortestPathNodeProps } from "../models";
const grid = new Subject<ShortestPathNodeProps[][]>();

export const gridStore = {
  $grid: grid.asObservable(),
  setGrid: (newGrid: ShortestPathNodeProps[][]) => grid.next(newGrid)
}