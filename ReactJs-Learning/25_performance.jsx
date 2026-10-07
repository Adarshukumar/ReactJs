// Lesson 25 — performance: measure, then optimize. Author: Adarsh
import { useState, memo, useMemo, useCallback, useDeferredValue, useTransition } from "react";

// 1. The Golden Rule: PROFILE FIRST. React DevTools Profiler shows
//    exactly which components re-render and why (props changed, parent did...).

// 2. Fix the big re-render sources:
const Row = memo(function Row({ item, onPick }) {       // memo: shallow prop check
  console.log("render row", item.id);
  return <li onClick={() => onPick(item)}>{item.name}</li>;
});

export function BigList({ items }) {
  const [picked, setPicked] = useState(null);
  const [filter, setFilter] = useState("");

  // stable callback so memo(Row) actually skips work:
  const handlePick = useCallback((item) => setPicked(item.name), []);

  // expensive filter cached:
  const visible = useMemo(
    () => items.filter((i) => i.name.includes(filter)),
    [items, filter],
  );

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>{visible.map((i) => <Row key={i.id} item={i} onPick={handlePick} />)}</ul>
      <p>picked: {picked}</p>
    </>
  );
}

// 3. Virtualize LONG lists — render only the visible window:
//    react-window / tanstack-virtual. 10,000 rows become ~20 DOM nodes.

// 4. Keys matter: index keys on reorderable lists = full remounts.

// 5. Code-split heavy routes:
// const Settings = lazy(() => import("./Settings.jsx"));
// <Suspense fallback={<p>…</p>}><Settings /></Suspense>

// 6. useTransition — keep typing responsive during big updates:
export function Search({ query }) {
  const deferred = useDeferredValue(query);     // low-priority copy
  const [isPending, startTransition] = useTransition();
  const results = useMemo(() => searchAll(deferred), [deferred]);
  return <p className={isPending ? "dim" : ""}>{results.length} results</p>;
}
function searchAll(q) { return q ? [{ id: 1, name: q }] : []; }

// 7. Don't create components inside components (remounts every render!):
//    function Page() { function Inner() {...} return <Inner />; }  <- NEVER

// Practice: profile a 5000-row list before/after memo+useCallback.
