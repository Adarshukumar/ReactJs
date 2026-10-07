// Lesson 18 — useCallback: stable function references. Author: Adarsh
import { useState, useCallback, memo } from "react";

// Functions are recreated every render -> new identity -> effects/children
// depending on them re-fire. useCallback pins the identity.

const ExpensiveRow = memo(function Row({ value, onSelect }) {
  // memo: skip re-render if props are === — which needs a STABLE onSelect!
  console.log("Row rendered", value.id);
  return <li onClick={() => onSelect(value.id)}>{value.name}</li>;
});

export function List() {
  const [items] = useState([{ id: 1, name: "a" }, { id: 2, name: "b" }]);
  const [selected, setSelected] = useState(null);
  const [tick, setTick] = useState(0);

  // WITHOUT useCallback: every `tick` re-creates onSelect -> every Row re-renders
  const handleSelect = useCallback((id) => setSelected(id), []);

  return (
    <>
      <p>selected: {selected} | ticks: {tick}</p>
      <button onClick={() => setTick(tick + 1)}>tick (Rows do NOT re-render)</button>
      <ul>
        {items.map((v) => <ExpensiveRow key={v.id} value={v} onSelect={handleSelect} />)}
      </ul>
    </>
  );
}

// When do you actually need it?
// 1. function passed to a memo()'d child
// 2. function in a dependency array (useEffect [fn]) — else effect loops
// 3. function returned from a custom hook into the same situations

// useEffect + function dep = the classic infinite loop:
function Loop() {
  const [data, setData] = useState(null);
  const load = () => fetch("/x").then((r) => r.json()).then(setData);
  // useEffect(() => { load(); }, [load]);  <- new load every render -> LOOP
  const stableLoad = useCallback(load, []);
  useEffect(() => { stableLoad(); }, [stableLoad]);
  return <p>{data ? "ok" : "…"}</p>;
}

// useMemo vs useCallback:
//   useMemo(() => fn, deps)  -> cached RESULT (a value)
//   useCallback(fn, deps)    -> cached FUNCTION itself

// Practice: fix an effect loop caused by an unstable handler in your code.
