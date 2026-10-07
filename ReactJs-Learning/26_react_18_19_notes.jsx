// Lesson 26 — what React 18/19 changed (my notes). Author: Adarsh

// REACT 18 — the concurrency release:
// 1. Automatic batching: multiple setStates in ONE render (even in
//    promises/timeouts — before, only React event handlers batched)

// 2. Transitions: mark updates as non-urgent
//    const [isPending, startTransition] = useTransition();
//    startTransition(() => setResults(filter(input)));   // can be interrupted

// 3. useDeferredValue: like debounce, but built into the scheduler

// 4. Suspense for data fetching (with framework integration)

// 5. New root API (createRoot) — createRoot(document.getElementById("root")).render(<App />)

// 6. Hooks added: useId (stable SSR-safe ids), useSyncExternalStore,
//    useInsertionEffect (library authors)

// REACT 19:
// 1. Actions + useActionState: forms that handle pending/error states natively
// 2. useOptimistic: show the happy path instantly, roll back on failure
// 3. use(promise/context): read a promise or context during render
// 4. Server Components & Server Actions (with Next.js etc.):
//    components that run ONLY on the server, zero JS shipped
// 5. ref as a regular prop (no more forwardRef!), ref cleanup functions
// 6. <Context> instead of <Context.Provider>
// 7. Document metadata: <title>/<meta> directly in components

// What I actually changed in my code:
// - stopped wrapping handlers in setState batching workarounds
// - started using useDeferredValue for search inputs
// - form submissions moving to useActionState patterns

// Practice: convert a controlled form to useActionState (with pending UI).
