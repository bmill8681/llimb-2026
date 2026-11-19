import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  PINBALL_BASE,
  PINBALL_COOKIE,
  PINBALL_COOKIE_MAX_AGE,
  isPinballAuthenticated,
  pinballAuthToken,
  pinballPasswordMatches,
} from "./auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The Unity build lives in public/public-house-pinball. Its files are gated by proxy.ts
// and served with Content-Encoding: br via headers() in next.config.ts.
const INDEX_PATH = path.join(process.cwd(), "public", "public-house-pinball", "index.html");

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
    <form method="POST" action="${PINBALL_BASE}">
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

export async function GET(request: NextRequest) {
  if (!isPinballAuthenticated(request)) {
    return html(loginPage(request.nextUrl.searchParams.has("error")), 401);
  }

  const source = await readFile(INDEX_PATH, "utf-8");
  // Make relative asset URLs ("Build/...") resolve under the route without a trailing slash.
  return html(source.replace("<head>", `<head>\n    <base href="${PINBALL_BASE}/">`));
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = form.get("password");

  if (typeof password !== "string" || !pinballPasswordMatches(password)) {
    return NextResponse.redirect(new URL(`${PINBALL_BASE}?error=1`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(PINBALL_BASE, request.url), 303);
  response.cookies.set(PINBALL_COOKIE, pinballAuthToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: PINBALL_BASE,
    maxAge: PINBALL_COOKIE_MAX_AGE,
  });
  return response;
}
