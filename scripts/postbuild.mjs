// Post-build step for `output: "standalone"` Next.js builds.
// Copies client static assets and the public/ folder into the standalone
// server output so `node .next/standalone/server.js` can serve them.
// Cross-platform (works on Windows, macOS and Linux) — replaces the
// previous `cp -r` chain which required a Unix shell.
import { cpSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error(
    "✗ .next/standalone not found — run `next build` with `output: \"standalone\"` first."
  );
  process.exit(1);
}

cpSync(path.join(root, ".next", "static"), path.join(standalone, ".next", "static"), {
  recursive: true,
});
cpSync(path.join(root, "public"), path.join(standalone, "public"), { recursive: true });

console.log("✓ Copied .next/static and public/ into .next/standalone");
