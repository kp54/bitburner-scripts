/**
 * @param {NS} ns
 * @param {Set<string>} visited
 * @param {string} host
 * @param {string[]} path
 * @param {(ns: NS, host: string, path: string[]) => Promise<void>} work
 */
const _walk = async (ns, visited, host, path, work) => {
  if (visited.has(host)) {
    return;
  }
  visited.add(host);

  await work(ns, host, path);

  const next = [...path, host];
  const hosts = ns.scan(host);
  for (const host of hosts) {
    await _walk(ns, visited, host, next, work);
  }
};

/**
 * @param {NS} ns
 * @param {(ns: NS, host: string, path: string[]) => Promise<void>} work
 */
export const walk = async (ns, work) => {
  /** @type {Set<string>} */
  const visited = new Set();
  await _walk(ns, visited, ns.getHostname(), [], work);
};
