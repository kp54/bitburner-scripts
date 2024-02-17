import { NS } from "@ns";

type Handler = (host: string, path: string[]) => Promise<void> | void;

export const walk = async (ns: NS, handle: Handler) => {
  const visited = new Set<string>();

  const _walk = async (host: string, path: string[]) => {
    if (visited.has(host)) {
      return;
    }
    visited.add(host);

    await handle(host, path);

    const next = [...path, host];
    const hosts = ns.scan(host);
    for (const host of hosts) {
      await _walk(host, next);
    }
  };

  await _walk(ns.getHostname(), []);
};
