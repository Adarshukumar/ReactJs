// Lesson 16 — custom hooks: extract logic, share it everywhere. Author: Adarsh
import { useState, useEffect, useCallback } from "react";

// Rule: name starts with `use`, may call other hooks.

// 1. useFetch — the classic
export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true }));
    fetch(url, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => error.name === "AbortError" || setState({ data: null, loading: false, error }));
    return () => controller.abort();
  }, [url]);

  return state;
}

// Usage: const { data, loading, error } = useFetch("/api/users");

// 2. useLocalStorage — persistent state
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

// 3. useToggle
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle];
}

// 4. useDebounce — delay until typing pauses
export function useDebounce(value, ms = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

// Composing hooks (hooks using hooks — totally fine):
export function SearchUsers(query) {
  const debounced = useDebounce(query, 500);
  return useFetch(debounced ? `/api/users?q=${debounced}` : null);
}

// Rules of hooks (ALL hooks):
// 1. top level only — never inside if/loops/nested functions
// 2. same order every render (that's WHY rule 1 exists)
// eslint-plugin-react-hooks enforces both.

// Practice: write useWindowSize() and useOnlineStatus() custom hooks.
