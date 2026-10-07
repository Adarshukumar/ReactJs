// Lesson 15 — useReducer: complex state with clean transitions. Author: Adarsh
import { useReducer } from "react";

// reducer = (state, action) => newState — pure, testable, no setState soup
function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.item] };
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "clear":
      return { items: [] };
    default:
      throw new Error(`unknown action: ${action.type}`);
  }
}

export function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <div>
      <button onClick={() => dispatch({ type: "add", item: { id: Date.now(), name: "coffee" } })}>
        add coffee
      </button>
      <button onClick={() => dispatch({ type: "clear" })}>clear</button>
      <ul>
        {cart.items.map((i) => (
          <li key={i.id}>
            {i.name}
            <button onClick={() => dispatch({ type: "remove", id: i.id })}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// When useState vs useReducer?
//   next = f(current, small change)                    -> useState
//   many fields updated together / many action types   -> useReducer
//   transitions with rules (loading -> success/error)  -> useReducer shines

// Async data + reducer pattern (fetch phases):
function dataReducer(state, action) {
  switch (action.type) {
    case "loading": return { status: "loading", data: null, error: null };
    case "success": return { status: "done", data: action.data, error: null };
    case "error":   return { status: "error", data: null, error: action.error };
  }
}

// Practice: convert lesson 08's TodoApp state to a todosReducer.
