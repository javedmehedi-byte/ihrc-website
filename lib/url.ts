// lib/url.ts
import { headers } from "next/headers";

/** Build an absolute URL for server-side fetches */
export async function absoluteUrl(path: string) {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host =
    h.get("x-forwarded-host") ??
    h.get("host") ??
    "localhost:3000";
  // ensure leading slash
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${proto}://${host}${p}`;
}
