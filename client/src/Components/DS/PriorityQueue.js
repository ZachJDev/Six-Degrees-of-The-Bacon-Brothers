class Node {
    constructor(val, pLevel) {
        this.val = val;
        this.priority = pLevel;
    }
}


class PriorityQueue {
    constructor() {
      this.values = [];
    }
    enqueue(val, priority) {

        let node = new Node(val, priority);

      // push onto array
      this.values.push(node);
      let newIndex = this.values.length - 1;
  
      //find parent
      let parent = this.findParent(newIndex);
      // Bubble up
      this.bubbleUp(parent, newIndex);
      return this;
    }
  
    dequeue() {
      const min = this.values[0];
      const bottom = this.values[this.values.length - 1]; // Popping here would not work; we reinsert on the next line.
      this.values[0] = bottom;
      this.values.pop(); // So I don't have to shift the indexes of everything.
      this.bubbleDown();
      return min;
    }
    bubbleUp(parentIndex, newIndex) {
      while (parentIndex >= 0 && this.values[newIndex].priority < this.values[parentIndex].priority) {
        this.swap(newIndex, parentIndex);
        newIndex = parentIndex;
        parentIndex = this.findParent(newIndex);
      }
    }
    bubbleDown() {
        if(!this.values[0]) return
      const top = this.values[0].priority; // The new value at the top
      let topIndex = 0;
      let leftIndex = this.findLeftChild(topIndex);

        // There's probably a more elegant solution... 
      while ((this.values[leftIndex] && top > this.values[leftIndex].priority )||
             (this.values[leftIndex + 1] && top > this.values[leftIndex + 1].priority)) {
        let swapIndex = this.FindSwapIndex(leftIndex, leftIndex + 1);
        this.swap(topIndex, swapIndex);
        topIndex = swapIndex;
        leftIndex = this.findLeftChild(topIndex);

      }
    }
  
    FindSwapIndex(idx1, idx2) {
      // find the correct index to swap with
        if(this.values[idx2] === undefined) return idx1 // Separated to illustrate more clearly the two conditions
      if (this.values[idx1].priority < this.values[idx2].priority) return idx1;
      return idx2;
    }
  
    swap(idx1, idx2) {
      let arr = this.values;
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
    findParent(index) {
      return Math.floor((index - 1) / 2);
    }
    findLeftChild(index) {
      return 2 * index + 1;
    }
  }
module.exports = PriorityQueue;