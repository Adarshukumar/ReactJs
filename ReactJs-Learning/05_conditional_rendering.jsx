// Lesson 05 — conditional rendering, all the flavors. Author: Adarsh
import { useState } from "react";

const Spinner = () => <span className="spin">◌</span>;
const ErrorBox = () => <p className="error">!</p>;

export function Status({ state }) {
  return (
    <div>
      {/* 1. ternary — two-way choice */}
      {state === "loading" ? <p>Loading…</p> : <p>Loaded!</p>}

      {/* 2. && — show only when truthy (beware: 0 renders as "0"!) */}
      {state === "error" && <ErrorBox />}

      {/* the 0 trap:
         {count && <Badge n={count} />}      <- count 0 renders "0"
         {count > 0 && <Badge n={count} />}  <- fixed                       */}
    </div>
  );
}

// 3. early return — great for guards
export function Profile({ user }) {
  if (!user) return <p>Please log in</p>;
  if (user.banned) return <p>Account suspended</p>;
  return <h1>{user.name}</h1>;
}

// 4. switch for multi-way state machines
export function Panel({ status }) {
  switch (status) {
    case "idle":    return <p>Nothing yet</p>;
    case "loading": return <Spinner />;
    case "error":   return <ErrorBox />;
    default:        return <p>Ready</p>;
  }
}

// 5. optional chaining + nullish defaults
export function UserCard({ user }) {
  return <p>{user?.name ?? "Anonymous"}</p>;
}

export function Demo() {
  const [on, setOn] = useState(false);
  return (
    <>
      <Panel status={on ? "loading" : "idle"} />
      <button onClick={() => setOn(!on)}>toggle</button>
      <UserCard user={{ name: "Adarsh" }} />
    </>
  );
}

// Practice: build a FetchState component with idle/loading/success/error UI.
