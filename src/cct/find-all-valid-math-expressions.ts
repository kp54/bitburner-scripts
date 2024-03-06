/*
Find All Valid Math Expressions
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following string which contains only digits between 0 and 9:

445400490

You are also given a target number of 84. Return all possible ways you can add the +(add), -(subtract), and *(multiply) operators to the string such that it evaluates to the target number. (Normal order of operations applies.)

The provided answer should be an array of strings containing the valid expressions. The data provided by this problem is an array with two elements. The first element is the string of digits, while the second element is the target number:

["445400490", 84]

NOTE: The order of evaluation expects script operator precedence NOTE: Numbers in the expression cannot have leading 0's. In other words, "1+01" is not a valid expression Examples:

Input: digits = "123", target = 6
Output: [1+2+3, 1*2*3]

Input: digits = "105", target = 5
Output: [1*0+5, 10-5]
*/

import { NS } from "@ns";

const isValid = (segment: string) => {
	if (segment !== "0" && segment.startsWith("0")) {
		return false;
	}

	const val = Number(segment);
	if (!Number.isFinite(val)) {
		return false;
	}

	return true;
};

const split = (line: string) => {
	const result = new Array<Array<string>>();
	const max = 1 << (line.length - 1);
	for (let i = 0; i < max; i++) {
		const segments = new Array<string>();
		let cur = 0;
		for (let j = 0; j < line.length - 1; j++) {
			if ((i & (1 << j)) !== 0) {
				segments.push(line.slice(cur, j + 1));
				cur = j + 1;
			}
		}
		segments.push(line.slice(cur, line.length));
		result.push(segments);
	}

	return result.filter((x) => x.every((y) => isValid(y)));
};

const build = (segments: string[]) => {
	if (segments.length < 2) {
		return segments;
	}

	const [head, ...rest] = segments;
	const tails = build(rest);

	const result = new Array<string>();
	for (const op of ["+", "-", "*"]) {
		for (const tail of tails) {
			result.push(`${head},${op},${tail}`);
		}
	}

	return result;
};

const calc = (expr: string[]) => {
	// biome-ignore lint/suspicious/noExplicitAny:
	const tokens: any[] = [...expr];
	for (let i = 0; i < tokens.length; i += 2) {
		tokens[i] = Number(tokens[i]);
	}

	let i = 1;
	while (i < tokens.length - 1) {
		if (tokens[i] !== "*") {
			i += 2;
			continue;
		}

		const head = i - 1;

		let mul = tokens[head];
		while (tokens[i] === "*" && i < tokens.length - 1) {
			mul *= tokens[i + 1];
			tokens[i] = "+";
			tokens[i + 1] = 0;
			i += 2;
		}

		tokens[head] = mul;
	}

	let sum: number = tokens[0];
	for (let i = 1; i < tokens.length - 1; i += 2) {
		switch (tokens[i]) {
			case "+":
				sum += tokens[i + 1];
				break;

			case "-":
				sum -= tokens[i + 1];
				break;

			default:
				throw new Error();
		}
	}

	return sum;
};

export const findAllValidMathExpressions = (input: [string, number]) => {
	const [line, sum] = input;

	const results = new Array<string>();

	for (const segments of split(line)) {
		for (const line of build(segments)) {
			const expr = line.split(",");
			if (calc(expr) === sum) {
				results.push(expr.join(""));
			}
		}
	}

	return results;
};

export const main = (ns: NS) => {
	ns.tprint(findAllValidMathExpressions(["445400490", 84]));
};
