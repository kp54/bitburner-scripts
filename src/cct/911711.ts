/*
Proper 2-Coloring of a Graph
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.

You are given the following data, representing a graph:
[12,[[9,11],[2,10],[7,8],[0,7],[7,9],[5,9],[1,10],[8,11],[2,6],[8,10],[4,8],[2,5],[0,5],[1,11],[3,7],[1,4],[0,10],[9,10],[3,7],[4,9]]]
Note that "graph", as used here, refers to the field of graph theory, and has no relation to statistics or plotting.

The first element of the data represents the number of vertices in the graph. Each vertex is a unique number between 0 and 11.
The next element of the data represents the edges of the graph. Two vertices u,v in a graph are said to be adjacent if there exists an edge [u,v].

Note that an edge [u,v] is the same as an edge [v,u], as order does not matter. You must construct a 2-coloring of the graph,
meaning that you have to assign each vertex in the graph a "color", either 0 or 1, such that no two adjacent vertices have the same color.

Submit your answer in the form of an array, where element i represents the color of vertex i.
If it is impossible to construct a 2-coloring of the given graph,instead submit an empty array.

Examples:

Input: [4, [[0, 2], [0, 3], [1, 2], [1, 3]]]
Output: [0, 0, 1, 1]

Input: [3, [[0, 1], [0, 2], [1, 2]]]
Output: []
*/

import { NS } from "@ns";

const solve = (nodes: number, edges: [number, number][]) => {
  const adjs = new Array(nodes).fill(0).map(() => new Array<number>());
  for (const [x, y] of edges) {
    adjs[x].push(y);
    adjs[y].push(x);
  }

  const sideA = new Set<number>();
  const sideB = new Set<number>();

  for (let x = 0; x < nodes; x++) {
    let sideX = sideA;
    let sideY = sideB;
    if (sideY.has(x)) {
      [sideX, sideY] = [sideY, sideX];
    }

    for (const y of adjs[x]) {
      if (sideX.has(y)) {
        return [];
      }
      sideY.add(y);
    }
  }

  const result = new Array<number>();
  for (let i = 0; i < nodes; i++) {
    if (sideA.has(i)) {
      result.push(0);
    } else {
      result.push(1);
    }
  }

  return result;
};

export const main = (ns: NS) => {
  ns.tprint(
    solve(12, [
      [9, 11],
      [2, 10],
      [7, 8],
      [0, 7],
      [7, 9],
      [5, 9],
      [1, 10],
      [8, 11],
      [2, 6],
      [8, 10],
      [4, 8],
      [2, 5],
      [0, 5],
      [1, 11],
      [3, 7],
      [1, 4],
      [0, 10],
      [9, 10],
      [3, 7],
      [4, 9],
    ]),
  );
};
