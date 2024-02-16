/*
Find Largest Prime Factor
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.

A prime factor is a factor that is a prime number. What is the largest prime factor of 847822246?
*/

import { NS } from "@ns";

const N = 847822246;

const factor = (n: number) => {
  const factors = new Set<number>();

  let i = 1;
  let sq = i * i;
  while (sq <= n) {
    if (n % i === 0) {
      factors.add(i);
      factors.add(n / i);
    }

    i += 1;
    sq = i * i;
  }

  return Array.from(factors).sort((x, y) => x - y);
};

const isPrime = (n: number) => {
  let i = 2;
  let sq = i * i;
  while (sq <= n) {
    if (n % i === 0) {
      return false;
    }

    i += 1;
    sq = i * i;
  }

  return true;
};

export const main = (ns: NS) => {
  ns.tprint(Math.max(...factor(N).filter((x) => isPrime(x))));
};
