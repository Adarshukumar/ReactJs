# React Cheatsheet — by Adarsh

## Component
```jsx
function Card({ title, children, onAction }) {
  return <div onClick={onAction}><h3>{title}</h3>{children}</div>;
}
```

## Hooks in one look
```jsx
const [v, setV] = useState(init);            // state
useEffect(() => { ...; return cleanup; }, [deps]);  // side effects
const ref = useRef(null);                    // DOM node / mutable box
const v = useContext(Ctx);                   // ambient data
const [state, dispatch] = useReducer(reducer, init);  // complex state
const m = useMemo(() => calc(x), [x]);       // cached value
const cb = useCallback(fn, [deps]);          // stable fn identity
```

## State updates (immutable!)
```jsx
setCount((c) => c + 1);                      // updater form
setForm({ ...form, name: v });               // object
setList([...list, item]);                    // add
setList(list.filter((i) => i.id !== id));    // remove
setList(list.map((i) => i.id === id ? { ...i, done: true } : i));  // update
```

## Lists & conditions
```jsx
{items.map((i) => <li key={i.id}>{i.name}</li>)}
{cond && <X />}   {a ? <A /> : <B />}   {user?.name ?? "?"}
```

## Events & forms
```jsx
onChange={(e) => setText(e.target.value)}
onSubmit={(e) => { e.preventDefault(); }}
<button onClick={() => go(id)}>{label}</button>
```

## Fetch pattern
```jsx
useEffect(() => {
  const c = new AbortController();
  fetch(url, { signal: c.signal }).then(r => r.json()).then(setData).catch(handle);
  return () => c.abort();
}, [url]);
```

## Custom hook
```jsx
function useToggle(init = false) {
  const [on, setOn] = useState(init);
  return [on, () => setOn((v) => !v)];
}
```

## Router (v6)
```jsx
<BrowserRouter><Routes>
  <Route path="/" element={<Home />} />
  <Route path="/u/:id" element={<User />} />
</Routes></BrowserRouter>
useParams() · useNavigate() · useSearchParams()
```

## Perf kit
`memo(Component)` · `useMemo` (slow values) · `useCallback` (handlers to
memo'd children/effect deps) · `lazy(() => import(...))` + Suspense ·
virtualize lists > ~200 rows

## Rules of hooks
1. top level only (no ifs/loops)  2. same order every render
3. eslint-plugin-react-hooks — always on

— Adarsh
