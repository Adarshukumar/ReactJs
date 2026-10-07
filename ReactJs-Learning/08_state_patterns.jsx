// Lesson 08 — state patterns I use weekly. Author: Adarsh
import { useState } from "react";

// 1. Lift state up: two siblings share one parent's state
function Celsius({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
export function TempConverter() {
  const [c, setC] = useState("0");
  return (
    <div>
      <Celsius value={c} onChange={setC} />
      <p>{isNaN(+c) ? "?" : ((+c * 9) / 5 + 32).toFixed(1)}°F</p>
    </div>
  );
}

// 2. Controlled vs uncontrolled inputs — CONTROLLED is the React way:
export function Controlled() {
  const [text, setText] = useState("");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

// 3. Toggle state = boolean, not strings
export function Modal() {
  const [open, setOpen] = useState(false);
  return open ? <dialog open>hi</dialog> : <button onClick={() => setOpen(true)}>open</button>;
}

// 4. State machine instead of many booleans (no impossible combos!):
const STATES = { idle: "idle", loading: "loading", error: "error", done: "done" };
export function Loader() {
  const [state, setState] = useState(STATES.idle);
  // NOT: isLoading + isError + isDone (8 impossible combinations)
  return <button onClick={() => setState(STATES.loading)}>{state}</button>;
}

// 5. Derived state: compute, don't store
export function Cart({ items }) {
  const total = items.reduce((s, i) => s + i.price, 0);   // NOT useState!
  return <p>{total}</p>;
}

// 6. Arrays in state: immutable updates only
export function TodoApp() {
  const [todos, setTodos] = useState([{ id: 1, text: "learn" }]);
  const add = (text) => setTodos([...todos, { id: Date.now(), text }]);
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggle = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id} onClick={() => toggle(t.id)} style={{ textDecoration: t.done ? "line-through" : "" }}>
          {t.text} <button onClick={(e) => { e.stopPropagation(); remove(t.id); }}>x</button>
        </li>
      ))}
      <button onClick={() => add("new")}>add</button>
    </ul>
  );
}

// Practice: add an input to TodoApp to type new todos.
