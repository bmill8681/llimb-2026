import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROUTE_BASE = "/public-house-pinball";
const GAME_ROOT = path.join(process.cwd(), "app", "pinball");
const PASSWORD = "criticalmass";
const COOKIE_NAME = "php_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".data": "application/octet-stream",
};

type RouteContext = { params: Promise<{ path?: string[] }> };

// The cookie holds a token derived from the password, never the password itself.
// Changing the password invalidates every existing session.
const authToken = () =>
  createHmac("sha256", PASSWORD).update("public-house-pinball").digest("hex");

const isAuthenticated = (request: NextRequest) => {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const expected = Buffer.from(authToken());
  const actual = Buffer.from(cookie);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};

const passwordMatches = (candidate: string) => {
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(PASSWORD).digest();
  return timingSafeEqual(a, b);
};

const loginPage = (showError: boolean) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Public House Pinball</title>
    <link rel="icon" href="/icon.png">
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; height: 100%; }
      body { display: flex; align-items: center; justify-content: center; padding: 16px;
        background: #d9431e; color: #fff4ec; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
      form { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 14px; }
      h1 { margin: 0 0 4px; font-size: 28px; letter-spacing: 0.02em; }
      p { margin: 0; color: rgba(255, 244, 236, 0.75); font-size: 15px; }
      input { font: inherit; padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0, 0.22); color: #fff4ec; outline: none; }
      input:focus { border-color: #fff4ec; }
      button { font: inherit; font-weight: 600; padding: 10px 12px; border-radius: 6px; border: none;
        background: #fff4ec; color: #d9431e; cursor: pointer; }
      button:hover { background: #ffffff; }
      .error { padding: 8px 12px; border-radius: 6px; background: #ffd7d0; color: #7a1b05; font-size: 14px; }
    </style>
  </head>
  <body>
    <form method="POST" action="${ROUTE_BASE}">
      <h1>Public House Pinball</h1>
      <p>This build is private. Enter the password to play.</p>
      ${showError ? '<div class="error" role="alert">Incorrect password. Try again.</div>' : ""}
      <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required autofocus>
      <button type="submit">Play</button>
    </form>
  </body>
</html>`;

const html = (body: string, status = 200) =>
  new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });

// Resolve a request path to a file inside GAME_ROOT, rejecting traversal attempts.
const resolveGameFile = (segments: string[]) => {
  const filePath = path.resolve(GAME_ROOT, ...segments);
  if (!filePath.startsWith(GAME_ROOT + path.sep)) return null;
  return filePath;
};

const serveFile = async (filePath: string) => {
  let size: number;
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new NextResponse("Not found", { status: 404 });
    size = info.size;
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  // Unity's Brotli-compressed build files: serve the inner type with Content-Encoding: br.
  const isBrotli = filePath.endsWith(".br");
  const innerExt = path.extname(isBrotli ? filePath.slice(0, -3) : filePath);
  const headers: Record<string, string> = {
    "Content-Type": CONTENT_TYPES[innerExt] ?? "application/octet-stream",
    "Content-Length": String(size),
    "Cache-Control": "private, max-age=3600",
    "X-Robots-Tag": "noindex, nofollow",
  };
  if (isBrotli) headers["Content-Encoding"] = "br";

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
  return new NextResponse(stream, { headers });
};

const serveIndex = async () => {
  const filePath = path.join(GAME_ROOT, "index.html");
  const source = await readFile(filePath, "utf-8");
  // Ensure relative asset URLs ("Build/...") resolve under the route even without a trailing slash.
  const withBase = source.replace("<head>", `<head>\n    <base href="${ROUTE_BASE}/">`);
  return html(withBase);
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const segments = (await params).path ?? [];

  if (!isAuthenticated(request)) {
    if (segments.length === 0) {
      return html(loginPage(request.nextUrl.searchParams.has("error")), 401);
    }
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (segments.length === 0 || (segments.length === 1 && segments[0] === "index.html")) {
    return serveIndex();
  }

  const filePath = resolveGameFile(segments);
  if (!filePath) return new NextResponse("Not found", { status: 404 });
  return serveFile(filePath);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const segments = (await params).path ?? [];
  if (segments.length > 0) {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  const form = await request.formData();
  const password = form.get("password");

  if (typeof password !== "string" || !passwordMatches(password)) {
    return NextResponse.redirect(new URL(`${ROUTE_BASE}?error=1`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(ROUTE_BASE, request.url), 303);
  response.cookies.set(COOKIE_NAME, authToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ROUTE_BASE,
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}
