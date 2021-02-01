//helper class for PriorityQueue
export class Node<T> {
  public val: T;
  public priority: number;
  constructor(val: T, priority: number) {
    this.val = val;
    this.priority = priority;
  }
}

export class PriorityQueue<T> {
  private values: Node<T>[];
  constructor() {
    this.values = [] as Node<T>[];
  }
  public enqueue(val: T, priority: number): void {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  private bubbleUp(): void {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  public dequeue(): Node<T> | null {
    if (this.values.length === 0) return null;
    const min = this.values[0];
    const end = this.values.pop() as Node<T>;
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  private sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild: Node<T> | { priority: 0 } = { priority: 0 }, rightChild: Node<T>;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx] as Node<T>;
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
  public isEmpty(): boolean {
    return this.values.length === 0;
  }
}
