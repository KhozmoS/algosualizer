export interface ShortestPathNodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isVisited: boolean;
  isInPath: boolean;
  weigth: number;
  onMouseDownEvent: (row: number, col: number) => void;
  onMouseEnterEvent: (row: number, col: number) => void;
  onMouseUpEvent: () => void;
}