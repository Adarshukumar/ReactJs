// Lesson 10 — useEffect: syncing with the OUTSIDE world. Author: Adarsh
import { useEffect, useState } from "react";

// The mental model: useEffect = "after render, do this side effect"
// Side effects: fetch, timers, subscriptions, localStorage, DOM measuring.

export function Logger({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // runs AFTER the component paints
    console.log("component rendered / userId changed:", userId);

    // optional CLEANUP function — runs before the NEXT effect + on unmount
    return () => console.log("cleanup for", userId);
  }, [userId]);          // dependency array: re-run when these change

  return <p>{user ? user.name : "…"}</p>;
}

// The three dependency modes:
//   useEffect(fn)          -> every render (rarely what you want)
//   useEffect(fn, [])      -> once, after mount
//   useEffect(fn, [a, b])  -> mount + whenever a or b changes

// Rules I never break:
// 1. EVERY value from outside (props/state) used inside the effect
//    belongs in the deps (enable eslint-plugin-react-hooks!)
// 2. If it can be computed during render, it's NOT an effect (derived state)
// 3. Cleanup everything you start (intervals, subscriptions, aborts)

export function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);      // without this: leaked intervals
  }, []);
  return <time>{now.toLocaleTimeString()}</time>;
}

// useEffect is an ESCAPE HATCH, not a lifecycle method. Prefer:
// event handlers for events, derived values for computation, effects
// only for truly external systems.

// Practice: build a DocumentTitle component that syncs document.title to a prop.
