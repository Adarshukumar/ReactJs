// Lesson 07 — useState: component memory. Author: Adarsh
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);     // [value, setter]

  return (
    <div>
      <p>Count: {count}</p>

      {/* WRONG: count++ does nothing React can see */}
      {/* RIGHT: */}
      <button onClick={() => setCount(count + 1)}>+1</button>

      {/* NEW state from OLD state — the updater form (safer in batches): */}
      <button onClick={() => setCount((c) => c + 1)}>+1 (updater)</button>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  );
}

// state updates are BATCHED and async-ish — read state right after set and
// you'll still see the OLD value within the same handler.

// The updater form matters when updates batch:
export function Triple() {
  const [n, setN] = useState(0);
  const triple = () => {
    setN((v) => v + 1);   // each sees the LATEST value
    setN((v) => v + 1);
    setN((v) => v + 1);   // result: +3 correctly
    // setN(n + 1) x3 would add only +1 (same stale n each time)
  };
  return <button onClick={triple}>triple: {n}</button>;
}

// OBJECT state: replace, don't mutate (React compares references)
export function ProfileForm() {
  const [form, setForm] = useState({ name: "Adarsh", age: 21 });
  return (
    <input
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}   // spread!
    />
  );
}

// LAZY initial state (for expensive computations only):
export function BigList() {
  const [items] = useState(() => Array.from({ length: 1000 }, (_, i) => i));
  return <p>{items.length} items</p>;
}

// Practice: build a stopwatch with start/stop/reset using seconds state.
