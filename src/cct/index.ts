import { algorithmicStockTraderIII } from "cct/algorithmic-stock-trader-iii";
import { arrayJumpingGame } from "cct/array-jumping-game";
import { findLargestPrimeFactor } from "cct/find-largest-prime-factor";
import { proper2ColoringOfAGraph } from "cct/proper-2-coloring-of-a-graph";
import { shortestPathInAGrid } from "cct/shortest-path-in-a-grid";
import { totalWaysToSum } from "cct/total-ways-to-sum";

// biome-ignore lint/suspicious/noExplicitAny:
type Solver = (input: any) => any;

export const solvers = new Map<string, Solver>([
  ["Algorithmic Stock Trader III", algorithmicStockTraderIII],
  ["Array Jumping Game", arrayJumpingGame],
  ["Find Largest Prime Factor", findLargestPrimeFactor],
  ["Proper 2-Coloring of a Graph", proper2ColoringOfAGraph],
  ["Shortest Path in a Grid", shortestPathInAGrid],
  ["Total Ways to Sum", totalWaysToSum],
]);
