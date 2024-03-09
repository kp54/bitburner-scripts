import { algorithmicStockTraderI } from "cct/algorithmic-stock-trader-i";
import { algorithmicStockTraderIII } from "cct/algorithmic-stock-trader-iii";
import { algorithmicStockTraderIV } from "cct/algorithmic-stock-trader-iv";
import { arrayJumpingGame } from "cct/array-jumping-game";
import { arrayJumpingGameII } from "cct/array-jumping-game-ii";
import { compressionI_RleCompression } from "cct/compression-i-rle-compression";
import { encryptionI_CaesarCipher } from "cct/encryption-i-caesar-cipher";
import { encryptionII_VigenereCipher } from "cct/encryption-ii-vigenere-cipher";
import { findAllValidMathExpressions } from "cct/find-all-valid-math-expressions";
import { findLargestPrimeFactor } from "cct/find-largest-prime-factor";
import { generateIpAddresses } from "cct/generate-ip-addresses";
import { mergeOverlappingIntervals } from "cct/merge-overlapping-intervals";
import { proper2ColoringOfAGraph } from "cct/proper-2-coloring-of-a-graph";
import { shortestPathInAGrid } from "cct/shortest-path-in-a-grid";
import { spiralizeMatrix } from "cct/spiralize-matrix";
import { subarrayWithMaximumSum } from "cct/subarray-with-maximum-sum";
import { totalWaysToSum } from "cct/total-ways-to-sum";
import { totalWaysToSumII } from "cct/total-ways-to-sum-ii";
import { uniquePathsInAGridI } from "cct/unique-paths-in-a-grid-i";
import { uniquePathsInAGridII } from "cct/unique-paths-in-a-grid-ii";

// biome-ignore lint/suspicious/noExplicitAny:
type Solver = (input: any) => any;

export const solvers = new Map<string, Solver>([
	["Algorithmic Stock Trader I", algorithmicStockTraderI],
	["Algorithmic Stock Trader III", algorithmicStockTraderIII],
	["Algorithmic Stock Trader IV", algorithmicStockTraderIV],
	["Array Jumping Game", arrayJumpingGame],
	["Array Jumping Game II", arrayJumpingGameII],
	["Compression I: RLE Compression", compressionI_RleCompression],
	["Encryption I: Caesar Cipher", encryptionI_CaesarCipher],
	["Encryption II: Vigenère Cipher", encryptionII_VigenereCipher],
	["Find All Valid Math Expressions", findAllValidMathExpressions],
	["Find Largest Prime Factor", findLargestPrimeFactor],
	["Generate IP Addresses", generateIpAddresses],
	["Merge Overlapping Intervals", mergeOverlappingIntervals],
	["Proper 2-Coloring of a Graph", proper2ColoringOfAGraph],
	["Shortest Path in a Grid", shortestPathInAGrid],
	["Spiralize Matrix", spiralizeMatrix],
	["Subarray with Maximum Sum", subarrayWithMaximumSum],
	["Total Ways to Sum", totalWaysToSum],
	["Total Ways to Sum II", totalWaysToSumII],
	["Unique Paths in a Grid I", uniquePathsInAGridI],
	["Unique Paths in a Grid II", uniquePathsInAGridII],
]);
