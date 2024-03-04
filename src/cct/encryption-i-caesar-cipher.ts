/*
Encryption I: Caesar Cipher
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Caesar cipher is one of the simplest encryption technique.
It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.
For example, with a left shift of 3, D would be replaced by A, E would become B, and A would become X (because of rotation).

You are given an array with two elements:
  ["TABLE ARRAY INBOX MACRO CACHE", 8]
The first element is the plaintext, the second element is the left shift value.

Return the ciphertext as uppercase string. Spaces remains the same.
*/

export const encryptionI_CaesarCipher = (input: [string, number]) => {
  const [plain, shift] = input;

  const offset = "A".charCodeAt(0);
  const map = new Map<string, string>();
  for (let i = 0; i < 26; i++) {
    map.set(
      String.fromCharCode(i + offset),
      String.fromCharCode(((i + 26 - shift) % 26) + offset),
    );
  }

  const crypt = new Array<string>();
  for (const c of plain) {
    crypt.push(map.get(c) ?? c);
  }

  return crypt.join("");
};
