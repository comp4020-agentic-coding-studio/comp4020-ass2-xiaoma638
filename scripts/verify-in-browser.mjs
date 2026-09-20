// The checks `pnpm check` cannot make, because they need a browser.
//
//   pnpm build && pnpm preview --port 4322 &
//   node scripts/verify-in-browser.mjs [baseUrl]
//
// Three things the vitest suite is not able to establish:
//   1. the simulator's *behaviour* — a stall freezes the bar while the clock
//      runs, reset restores the initial state, retry resumes instead of
//      restarting, and the unknown-total scenario shows no fraction anywhere;
//   2. every focusable control has a visible focus indicator (axe has no
//      automatic rule for this, and the theme's dark-mode toggle failed it);
//   3. horizontal overflow at the two marking viewports, measured from a real
//      emulated viewport rather than from a screenshot — `--window-size` does
//      not set the layout viewport, and a screenshot taken that way shows
//      clipping on pages that are fine.
//
// Exits non-zero if any check fails, so it can be wired into CI later.
import { spawn } from "node:child_process";

const BASE = process.argv[2] ?? "http://localhost:4322/comp4020-ass2-xiaoma638";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9250;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const failures = [];
const ok = (label, pass, detail = "") => {
  console.log(`${pass ? "  ok  " : "FAIL  "}${label}${detail ? `  — ${detail}` : ""}`);
  if (!pass) failures.push(label);
};

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, "--disable-gpu", "--hide-scrollbars",
  "--no-first-run", "--user-data-dir=/tmp/cdp-verify", "about:blank",
], { stdio: "ignore" });

let targets;
for (let i = 0; i < 60; i += 1) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); break; }
  catch { await sleep(250); }
}
if (!targets) { console.error("could not start Chrome"); process.exit(2); }
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const js = async (expr) =>
  (await send("Runtime.evaluate", { returnByValue: true, expression: `(()=>{${expr}})()` })).result?.value;
const go = async (path) => { await send("Page.navigate", { url: BASE + path }); await sleep(900); };
const viewport = (w, h) =>
  send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
const tab = async () => {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
};
await send("Page.enable");

const probe = `
  const bar = document.querySelector('[data-sim-bar]');
  return {
    now: bar.getAttribute('aria-valuenow'),
    stage: document.querySelector('[data-sim-stage]').textContent.trim(),
    events: +document.querySelector('[data-sim-count]').textContent,
    fill: document.querySelector('[data-sim-fill]').style.width,
    elapsed: parseFloat(document.querySelector('[data-sim-elapsed]').textContent),
    percentText: document.querySelector('[data-sim-percent]').textContent.trim(),
    startLabel: document.querySelector('[data-sim-start]').textContent.trim(),
  };`;
const run = async (scenario) => {
  await go("/simulator/");
  await js(`document.querySelector('[data-sim-fast]').checked = true;
    [...document.querySelectorAll('input[name=scenario]')].find(r => r.value === '${scenario}').click();
    return 1;`);
  await sleep(250);
  await js(`document.querySelector('[data-sim-start]').click(); return 1;`);
};

console.log("\n— simulator behaviour —");
await viewport(1440, 1000);

await run("steady");
await sleep(5200);
const done = await js(probe);
ok("steady reaches 100 only at the committed event", done.now === "100" && done.stage === "Complete",
  `valuenow=${done.now} stage=${done.stage}`);

await run("unknown");
await sleep(900);
const unknown = await js(probe);
const anyFraction = await js(`return /\\d+\\s*%/.test(document.querySelector('.sim-display').innerText);`);
ok("unknown total omits aria-valuenow entirely", unknown.now === null, `got ${JSON.stringify(unknown.now)}`);
ok("unknown total shows no fraction anywhere", anyFraction === false, unknown.percentText);

await run("stall");
await sleep(1600);
const a = await js(probe);
await sleep(900);
const b = await js(probe);
ok("stall freezes the bar", a.fill === b.fill && /stalled/i.test(a.stage), `${a.fill} → ${b.fill}`);
ok("stall keeps the clock running", b.elapsed > a.elapsed, `${a.elapsed}s → ${b.elapsed}s`);
await sleep(1800);
ok("stall recovers on its own", !/stalled/i.test((await js(probe)).stage));

await run("failure");
await sleep(3000);
const failed = await js(probe);
await js(`document.querySelector('[data-sim-start]').click(); return 1;`);
await sleep(400);
const retried = await js(probe);
ok("failure offers a retry", failed.startLabel === "Retry", failed.startLabel);
ok("retry resumes rather than restarting", Number(retried.now) >= Number(failed.now),
  `${failed.now} → ${retried.now}`);
ok("retry does not reset the clock", retried.elapsed >= failed.elapsed,
  `${failed.elapsed}s → ${retried.elapsed}s`);

await run("steady");
await sleep(700);
await js(`document.querySelector('[data-sim-reset]').click(); return 1;`);
await sleep(300);
const reset = await js(probe);
ok("reset restores the initial state",
  reset.now === "0" && reset.events === 0 && reset.stage === "Idle" && reset.fill === "0%",
  `${reset.now}/${reset.events}/${reset.stage}/${reset.fill}`);

console.log("\n— keyboard —");
for (const [w, h, name] of [[1920, 1080, "1920×1080"], [390, 844, "390×844"]]) {
  await viewport(w, h);
  await go("/simulator/");
  const noRing = [];
  for (let i = 0; i < 30; i += 1) {
    await tab();
    const f = await js(`const a = document.activeElement;
      if (!a || a === document.body) return null;
      const cs = getComputedStyle(a);
      return { n: (a.getAttribute('aria-label') || a.textContent || a.type || '').trim().slice(0, 30),
        ring: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none' };`);
    if (!f) break;
    if (!f.ring) noRing.push(f.n);
  }
  ok(`${name}: every focusable control shows focus`, noRing.length === 0, noRing.join(", "));
}

await viewport(390, 844);
await go("/");
let openedMenu = false;
for (let i = 0; i < 6; i += 1) {
  await tab();
  const n = await js(`const a = document.activeElement; return a ? (a.getAttribute('aria-label') || a.textContent || '').trim() : '';`);
  if (/menu/i.test(n)) {
    await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await send("Input.dispatchKeyEvent", { type: "char", text: "\r" });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await sleep(600);
    const reachable = await js(`const a = [...document.querySelectorAll('header a,nav a')].find(x => /Studios/i.test(x.textContent));
      return a && !a.closest('.at-nav-links-wrapper')?.hasAttribute('inert');`);
    openedMenu = reachable === true;
    break;
  }
}
ok("390×844: the nav opens from the keyboard and reaches the week list", openedMenu);

console.log("\n— horizontal overflow, both viewports —");
const routes = ["/", "/overview/", "/calendar/", "/sessions/", "/sessions/02-what-counts-as-done/",
  "/sessions/05-why-the-estimate-jumps/", "/sessions/11-watching-someone-wait/",
  "/lectures/", "/lectures/week-07/", "/assessments/", "/assessments/honest-waiting-kit/",
  "/readings/", "/glossary/", "/simulator/", "/policies/", "/people/"];
for (const [w, h, name] of [[1920, 1080, "1920×1080"], [390, 844, "390×844"]]) {
  await viewport(w, h);
  const over = [];
  for (const route of routes) {
    await go(route);
    const extra = await js(`const d = document.documentElement; return d.scrollWidth - d.clientWidth;`);
    if (extra > 1) over.push(`${route} +${extra}px`);
  }
  ok(`${name}: no page scrolls sideways`, over.length === 0, over.join(", "));
}

ws.close();
chrome.kill();
console.log(`\n${failures.length === 0 ? "all browser checks passed" : `${failures.length} FAILED: ${failures.join("; ")}`}`);
process.exit(failures.length === 0 ? 0 : 1);
