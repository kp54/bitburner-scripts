import { algorithmicStockTraderIII } from "cct/algorithmic-stock-trader-iii";
import { algorithmicStockTraderIV } from "cct/algorithmic-stock-trader-iv";
import { arrayJumpingGame } from "cct/array-jumping-game";
import { compressionI_RleCompression } from "cct/compression-i-rle-compression";
import { findAllValidMathExpressions } from "cct/find-all-valid-math-expressions";
import { findLargestPrimeFactor } from "cct/find-largest-prime-factor";
import { generateIpAddresses } from "cct/generate-ip-addresses";
import { proper2ColoringOfAGraph } from "cct/proper-2-coloring-of-a-graph";
import { shortestPathInAGrid } from "cct/shortest-path-in-a-grid";
import { totalWaysToSum } from "cct/total-ways-to-sum";
import { totalWaysToSumII } from "cct/total-ways-to-sum-ii";

// biome-ignore lint/suspicious/noExplicitAny:
type Solver = (input: any) => any;

export const solvers = new Map<string, Solver>([
  ["Algorithmic Stock Trader III", algorithmicStockTraderIII],
  ["Algorithmic Stock Trader IV", algorithmicStockTraderIV],
  ["Array Jumping Game", arrayJumpingGame],
  ["Compression I: RLE Compression", compressionI_RleCompression],
  ["Find All Valid Math Expressions", findAllValidMathExpressions],
  ["Find Largest Prime Factor", findLargestPrimeFactor],
  ["Generate IP Addresses", generateIpAddresses],
  ["Proper 2-Coloring of a Graph", proper2ColoringOfAGraph],
  ["Shortest Path in a Grid", shortestPathInAGrid],
  ["Total Ways to Sum", totalWaysToSum],
  ["Total Ways to Sum II", totalWaysToSumII],
]);
