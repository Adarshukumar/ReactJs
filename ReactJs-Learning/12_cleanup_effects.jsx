// Lesson 12 — cleanup: effects that clean up after themselves. Author: Adarsh
import { useEffect, useState } from "react";

// Every subscription/timer/listener started in an effect MUST be torn down.
// Cleanup runs: before deps-change re-runs, AND on unmount.

// 1. Timers
export function Ticker() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{n}s</p>;
}

// 2. Event listeners
export function WindowSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const onResize = () => setSize({ w: innerWidth, h: innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <p>{size.w}x{size.h}</p>;
}

// 3. Subscriptions (friend-of-a-friend pattern)
class Store {
  #listeners = new Set();
  subscribe(fn) { this.#listeners.add(fn); return () => this.#listeners.delete(fn); }
  emit(v) { this.#listeners.forEach((fn) => fn(v)); }
}
const store = new Store();

export function StoreValue() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const unsubscribe = store.subscribe(setV);   // returns cleanup fn!
    return unsubscribe;
  }, []);
  return <button onClick={() => store.emit(v + 1)}>{v}</button>;
}

// 4. Keeping props in sync (the "refecth on change" cleanup):
export function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    let active = true;                          // the ignore-flag pattern
    fetch(`/api/search?q=${query}`)
      .then((r) => r.json())
      .then((data) => { if (active) setResults(data); });
    return () => { active = false; };           // stale response ignored
  }, [query]);
  return <ul>{results.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;
}

// Practice: an effect that logs mount/unmount AND every query change.
