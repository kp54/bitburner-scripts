/*
Spiralize Matrix
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following array of arrays of numbers representing a 2D matrix, return the elements of the matrix as an array in spiral order:

    [
        [19,29, 9]
        [15,21,24]
        [39,43,35]
        [16,24,48]
        [21, 3,40]
    ]

Here is an example of what spiral order should be:

    [
        [1, 2, 3]
        [4, 5, 6]
        [7, 8, 9]
    ]

Answer: [1, 2, 3, 6, 9, 8 ,7, 4, 5]

Note that the matrix will not always be square:

    [
        [1,  2,  3,  4]
        [5,  6,  7,  8]
        [9, 10, 11, 12]
    ]

Answer: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
*/

export const spiralizeMatrix = (input: number[][]) => {
  const map = input.map((x) => [0, ...x, 0]);
  map.unshift(new Array(map[0].length).fill(0));
  map.push(new Array(map[0].length).fill(0));

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  let d = 0;

  const result = new Array<number>();
  let x = 1;
  let y = 1;
  while (true) {
    console.log({ x, y, d });
    console.log(map);

    const [dx, dy] = directions[d];
    const x_ = x + dx;
    const y_ = y + dy;

    if (map[y_][x_] !== 0) {
      result.push(map[y][x]);
      map[y][x] = 0;

      x = x_;
      y = y_;
      continue;
    }

    if (
      map[y][x - 1] === 0 &&
      map[y][x + 1] === 0 &&
      map[y - 1][x] === 0 &&
      map[y + 1][x] === 0
    ) {
      result.push(map[y][x]);
      break;
    }

    d = (d + 1) % directions.length;
  }

  return result;
};
