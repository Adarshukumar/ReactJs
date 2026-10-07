// Lesson 04 — rendering lists + the key prop. Author: Adarsh

const todos = [
  { id: 1, text: "learn JSX", done: true },
  { id: 2, text: "learn hooks", done: false },
  { id: 3, text: "build an app", done: false },
];

export function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        // key: React's identity for each item across re-renders.
        // STABLE + UNIQUE (from data, NOT the array index if the list
        // can reorder — index keys cause state bugs).
        <li key={todo.id} className={todo.done ? "done" : ""}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// any expression works: filter, chain, nested maps
export function Pending() {
  return (
    <ol>
      {todos
        .filter((t) => !t.done)
        .map((t) => <li key={t.id}>{t.text}</li>)}
    </ol>
  );
}

// objects/arrays as children render NOTHING — map them into elements first:
// {todo}              <- renders nothing (object)
// {Object.entries(o).map(([k, v]) => <li key={k}>{k}: {v}</li>)}  <- works

// Fragments in maps need the long form to carry the key:
function Rows({ items }) {
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.def}</dd>
        </React.Fragment>
      ))}
    </>
  );
}

// Practice: render a nested list: categories -> products from raw data.
