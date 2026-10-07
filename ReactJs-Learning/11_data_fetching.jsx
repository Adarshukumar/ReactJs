// Lesson 11 — data fetching with effects (and why libraries exist). Author: Adarsh
import { useEffect, useState } from "react";

// The hand-rolled pattern — know it cold, even if you later use TanStack Query:
export function UserProfile({ userId }) {
  const [state, setState] = useState({ status: "idle", data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();          // cancel on change/unmount

    setState({ status: "loading", data: null, error: null });
    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);   // fetch lies on 404!
        return res.json();
      })
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;         // cancelled, ignore
        setState({ status: "error", data: null, error: err.message });
      });

    return () => controller.abort();                   // CLEANUP
  }, [userId]);

  if (state.status === "loading") return <p>Loading…</p>;
  if (state.status === "error") return <p>Error: {state.error}</p>;
  if (state.status === "idle") return null;
  return <h1>{state.data.name}</h1>;
}

// Waterfalls vs parallel fetching:
export function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  // WATERFALL (slow): posts wait for user, needlessly
  useEffect(() => { fetch("/api/me").then(r => r.json()).then(setUser); }, []);
  useEffect(() => { if (user) fetch("/api/posts").then(r => r.json()).then(setPosts); }, [user]);

  // PARALLEL when independent: fire together, await together
  useEffect(() => {
    Promise.all([
      fetch("/api/me").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
    ]).then(([u, p]) => { setUser(u); setPosts(p); });
  }, []);

  return <p>{user?.name} — {posts?.length ?? 0} posts</p>;
}

// Race condition classic: userId changes fast, responses arrive out of order.
// The AbortController cleanup above SOLVES it — cancelled requests can't win.

// In real apps: TanStack Query / SWR give caching, retries, dedupe for free.

// Practice: build useUser(id) returning {user, loading, error} as a custom hook.
