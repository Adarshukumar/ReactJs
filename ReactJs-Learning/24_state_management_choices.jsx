// Lesson 24 — state management: which tool, when. Author: Adarsh

// THE LADDER — climb only as high as the problem demands:

// 1. Local state (useState/useReducer) — default home of ALL state
//    Rule: state lives at the LOWEST common ancestor of its users.

// 2. Lift up / compose — two siblings need it? Move state to parent.

// 3. Context — for "ambient" data (theme, auth, locale) changing RARELY.
//    Delivery mechanism, not a store.

// 4. Server state is a DIFFERENT beast: caching, dedupe, refetch, invalidation
//    -> TanStack Query / SWR. Stop putting API data in Redux — 2020 is over.

// 5. Global client state at scale: Zustand (tiny) / Redux Toolkit (batteries)

// Zustand flavor:
// const useStore = create((set) => ({
//   count: 0,
//   bump: () => set((s) => ({ count: s.count + 1 })),
// }));
// function C() { const count = useStore((s) => s.count); return <b>{count}</b>; }

// Redux Toolkit flavor:
// const slice = createSlice({
//   name: "cart",
//   initialState: { items: [] },
//   reducers: { add: (s, a) => { s.items.push(a.payload); } },
// });
// store.dispatch(slice.actions.add("coffee"));

// My decision questions:
// - Who needs it? (one component -> local)
// - Does it come from a server? -> TanStack Query
// - Does everything need it? (auth/theme) -> context
// - Complex shared transitions? -> zustand/RTK

// Anti-patterns: giant god-store, storing derived data, putting
// EVERYTHING in global state on day one.

// Practice: build the same tiny cart in plain useState AND zustand.
