// Simple implementation for Dijkstra
// class PriorityQueue {
//   constructor() {
//     this.values = [];
//   }
//   enqueue(val, priority) {
//     this.values.push({ val, priority });
//     this.sort();
//   }
//   dequeue() {
//     return this.values.shift();
//   }


//   sort() {
  //     this.values.sort((a, b) => a.priority - b.priority);
  //   }
  // }
  
const PriorityQueue = require("./PriorityQueue");

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  pop() {
    if (!this.first) return null;

    let head = this.first;
    this.first = this.first.next;
    this.size--;

    if (this.length === 0) {
      this.first = null;
      this.last = null;
    }

    return head;
  }
  push(val) {
    let node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = this.first;
    } else {
      node.next = this.first;
      this.first = node;
    }
    return ++this.size;
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  adjacent(v1, v2) {
    return this.adjacencyList[v1].includes(v2);
  }

  addVertex(name) {
    try {
      if (this.adjacencyList[name] === undefined) this.adjacencyList[name] = [];
      else throw new Error("Vertex Already Exists");
    } catch (e) {
      console.log(e.message);
    } finally {
      return this;
    }
  }
  addEdge(vertex1, vertex2) {
    if (
      this.adjacencyList[vertex1] !== undefined &&
      this.adjacencyList[vertex2] !== undefined
    ) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      return this;
    }
    return undefined;
  }
  removeEdge(vertex1, vertex2) {
    if (
      this.adjacencyList[vertex1] !== undefined &&
      this.adjacencyList[vertex2] !== undefined
    ) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex !== vertex1
      );
      return this;
    }
    return undefined;
  }

  removeVertex(removedVertex) {
    while (this.adjacencyList[removedVertex].length) {
      const adjacentVertex = this.adjacencyList[removedVertex].pop();
      this.removeEdge(removedVertex, adjacentVertex);
    }
    delete this.adjacencyList[removedVertex];
  }

  DFSRecursive(vertex) {
    const visited = {};
    const results = [];

    const DFS = (v) => {
      results.push(v);
      visited[v] = true;
      if (this.adjacencyList[v].length === 0) return;
      for (let neighbor of this.adjacencyList[v]) {
        if (!visited[neighbor]) DFS(neighbor);
      }
    };
    DFS(vertex);
    return results;
  }

  DFSIterative(start) {
    const visited = {};
    const results = [];

    const s = new Stack();
    s.push(start);

    while (s.size) {
      let vertex = s.pop();
      if (!visited[vertex.val]) {
        results.push(vertex.val);
        visited[vertex.val] = true;
        for (let neighbor of this.adjacencyList[vertex.val]) {
          if (!visited[vertex]) s.push(neighbor);
        }
      }
    }
    return results;
  }

  BFS(start) {
    const visited = {};
    const results = [];

    const q = [start];
    visited[start] = true;

    while (q.length) {
      let vertex = q.pop();
      results.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          q.unshift(neighbor);
        }
      }
    }
    return results;
  }
}

class WeightedGraph extends Graph {
  constructor() {
    super();
  }
  addEdge(vertex1, vertex2, weight) {
    if (
      this.adjacencyList[vertex1] !== undefined &&
      this.adjacencyList[vertex2] !== undefined
    ) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
      return this;
    }
    return undefined;
  }
  removeEdge(vertex1, vertex2) {
    if (
      this.adjacencyList[vertex1] !== undefined &&
      this.adjacencyList[vertex2] !== undefined
    ) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex.node !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex.node !== vertex1
      );
      return this;
    }
    return undefined;
  }

  Dijkstra(start, end) {
    // Set up helper Data Structures
    const distances = {};
    const previous = {};
    let q = new PriorityQueue();

    // Initialize state
    for (let key in this.adjacencyList) {
      distances[key] = key === start ? 0 : Infinity;
      q.enqueue(key, distances[key]);
      previous[key] = null;
    }

    // Loop while we have things in the queue
    while (q.values.length) {
      let check = q.dequeue().val;
      if (check !== end) {
        // Loop through the neighboring vertices and determine distance from start
        for (let neighbor of this.adjacencyList[check]) {
          const newDist = this.getWeight(check, neighbor.node) + distances[check];

          // Update the state if this is a shorter path than the old path
          if (newDist < distances[neighbor.node]) {
            distances[neighbor.node] = newDist;
            previous[neighbor.node] = check;
            // Enqueue neighboring node with the new distance
            q.enqueue(neighbor.node, newDist);
          }
        }
      } else {
        // We've found the shortest path;
        // Initialize an empty array for the path
        const arr = [];
        let prev = check;
        // Build up the nodes
        while (previous[prev]) {
          arr.push(prev);
          prev = previous[prev];
        }
        // Push the starting node
        arr.push(prev);
        // put array in correct order
        return arr.reverse();
      }
    }
  }

  getWeight(vertex1, vertex2) {
    try {
      return this.adjacencyList[vertex1].filter(
        (vert) => vert.node === vertex2
      )[0].weight;
    } catch (e) {
      return undefined;
    }
  }
}

// let g = new Graph();
// const names = {
//   a: "Alice",
//   b: "Bob",
//   c: "Charlie",
//   d: "Desmond",
//   e: "Evan",
//   f: "Frank",
//   g: "Gary",
//   h: "Harry",
//   i: "Ivan",
// };

// for(let name in names) {
//     g.addVertex(names[name])
// }

// for(let name in names) {
//     for(let name2 in names) {
//         if(Math.random() > .75 && name !== name2 && !g.adjacent(names[name], names[name2])) g.addEdge(names[name], names[name2])
//     }
// }

// const wg = new WeightedGraph();
// const wg2 = new WeightedGraph();

// wg.addVertex("A");
// wg.addVertex("B");
// wg.addVertex("C");
// wg.addVertex("D");
// wg.addVertex("E");

// wg.addEdge("A", "B", 4);
// wg.addEdge("A", "C", 6);
// wg.addEdge("B", "C", 3);
// wg.addEdge("B", "D", 2);
// wg.addEdge("C", "E", 4);
// wg.addEdge("D", "E", 4);

// wg2.addVertex("A");
// wg2.addVertex("B");
// wg2.addVertex("C");
// wg2.addVertex("D");
// wg2.addVertex("E");
// wg2.addVertex("F");

// wg2.addEdge("A", "B", 4);
// wg2.addEdge("A", "C", 2);
// wg2.addEdge("B", "E", 3);
// wg2.addEdge("C", "D", 2);
// wg2.addEdge("C", "F", 4);
// wg2.addEdge("D", "E", 3);
// wg2.addEdge("D", "F", 1);
// wg2.addEdge("E", "F", 1);

module.exports = Graph;