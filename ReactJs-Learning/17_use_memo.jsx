// Lesson 17 — useMemo: caching computed values. Author: Adarsh
import { useMemo, useState } from "react";

// useMemo recomputes ONLY when dependencies change — otherwise reuses.
const bigComputation = (n) => {
  let total = 0;
  for (let i = 0; i < 1e7; i++) total += (i * n) % 7;
  return total;
};

export function Expensive({ n }) {
  const result = useMemo(() => bigComputation(n), [n]);   // cached per n
  return <p>result: {result}</p>;
}

// Common real use: keep object/array IDENTITIES stable
export function FilteredList({ items, query }) {
  const visible = useMemo(
    () => items.filter((i) => i.name.includes(query)),
    [items, query],
  );
  return <ul>{visible.map((i) => <li key={i.id}>{i.name}</li>)}</ul>;
}

// Stable context value (lesson 14 gotcha fixed):
const ThemeCtx = { current: null };   // imagine a createContext
export function ThemeProvider({ theme, setTheme, children }) {
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeCtx.current.Provider value={value}>{children}</ThemeCtx.current.Provider>;
}

// THE RULES:
// 1. measure first — most memoization is wasted effort (React is fast)
// 2. memo when: genuinely slow computation, or referential equality
//    matters (children memo'd, context values, dependency arrays)
// 3. useMemo is a HINT — React may throw the cache away

// Sorting a big list on every keystroke? Memo. Concatenating two strings? No.

export function Demo() {
  const [n, setN] = useState(10);
  const [unrelated, setUnrelated] = useState(0);
  const r = useMemo(() => bigComputation(n), [n]);
  return (
    <>
      <p>{r} (unrelated re-render #{unrelated} doesn't recompute)</p>
      <button onClick={() => setN(n + 1)}>n++</button>
      <button onClick={() => setUnrelated(unrelated + 1)}>unrelated++</button>
    </>
  );
}

// Practice: memoize a sorted+filtered product list; verify with console.count.
