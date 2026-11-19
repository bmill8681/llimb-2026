import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const PINBALL_BASE = "/public-house-pinball";
export const PINBALL_COOKIE = "php_auth";
export const PINBALL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const PASSWORD = "criticalmass";

// The cookie holds a token derived from the password, never the password itself.
// Changing the password invalidates every existing session.
export const pinballAuthToken = () =>
  createHmac("sha256", PASSWORD).update("public-house-pinball").digest("hex");

export const isPinballAuthenticated = (request: NextRequest) => {
  const cookie = request.cookies.get(PINBALL_COOKIE)?.value;
  if (!cookie) return false;
  const expected = Buffer.from(pinballAuthToken());
  const actual = Buffer.from(cookie);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};

export const pinballPasswordMatches = (candidate: string) => {
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(PASSWORD).digest();
  return timingSafeEqual(a, b);
};
