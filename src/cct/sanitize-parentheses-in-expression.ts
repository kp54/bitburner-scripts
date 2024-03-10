/*
Sanitize Parentheses in Expression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following string:

)())(a(a(

remove the minimum number of invalid parentheses in order to validate the string.
If there are multiple minimal ways to validate the string, provide all of the possible results.
The answer should be provided as an array of strings.
If it is impossible to validate the string the result should be an array with only an empty string.

IMPORTANT: The string may contain letters, not just parentheses. Examples:
"()())()" -> ["()()()", "(())()"]
"(a)())()" -> ["(a)()()", "(a())()"]
")(" -> [""]
*/

const isValid = (line: string) => {
	let depth = 0;

	for (let i = 0; i < line.length; i++) {
		if (line[i] === "(") {
			depth += 1;
		}

		if (line[i] === ")") {
			depth -= 1;
		}

		if (depth < 0) {
			return false;
		}
	}

	return depth === 0;
};

export const sanitizeParenthesesInExpression = (input: string) => {
	const patterns = new Set<string>();
	for (let i = 0; i < 1 << input.length; i++) {
		const chars = [...input];
		for (let j = 0; j < chars.length; j++) {
			if ((i & (1 << j)) !== 0 && (chars[j] === "(" || chars[j] === ")")) {
				chars[j] = "";
			}
		}
		patterns.add(chars.join(""));
	}

	let max = 0;
	const max_patterns = [];
	for (const x of patterns) {
		if (!isValid(x)) {
			continue;
		}

		if (max < x.length) {
			max_patterns.splice(0);
			max_patterns.push(x);
			max = x.length;
			continue;
		}

		if (x.length === max) {
			max_patterns.push(x);
		}
	}

	return max_patterns;
};
