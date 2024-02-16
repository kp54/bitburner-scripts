import { NS } from "@ns";

type Handler = (ns: NS, host: string, path: string[]) => Promise<void> | void;

const _walk = async (
  ns: NS,
  visited: Set<string>,
  host: string,
  path: string[],
  handle: Handler,
) => {
  if (visited.has(host)) {
    return;
  }
  visited.add(host);

  await handle(ns, host, path);

  const next = [...path, host];
  const hosts = ns.scan(host);
  for (const host of hosts) {
    await _walk(ns, visited, host, next, handle);
  }
};

export const walk = async (ns: NS, handle: Handler) => {
  const visited = new Set<string>();
  await _walk(ns, visited, ns.getHostname(), [], handle);
};
