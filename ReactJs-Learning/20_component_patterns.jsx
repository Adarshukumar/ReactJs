// Lesson 20 — patterns I reach for repeatedly. Author: Adarsh
import { useState } from "react";

// 1. Container/Presentational split
//    container: data + behavior   |   presentational: looks only
function UserListContainer() {
  const users = [{ id: 1, name: "Adarsh" }];         // fetched really
  const onSelect = (id) => console.log(id);
  return <UserList users={users} onSelect={onSelect} />;
}
function UserList({ users, onSelect }) {             // pure display
  return <ul>{users.map((u) => <li key={u.id} onClick={() => onSelect(u.id)}>{u.name}</li>)}</ul>;
}

// 2. Compound components (like <select><option/>): parent coordinates,
//    children render — connected via context or clones
const TabsCtx = { current: null };
export function Tabs({ active, onChange, children }) {
  return <TabsCtx.Provider value={{ active, onChange }}>{children}</TabsCtx.Provider>;
}
export function Tab({ name, children }) {
  return <button onClick={() => {}}>{name}{children}</button>;
}

// 3. HOC (higher-order component) — a function that UPGRADES a component
function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <p>Loading…</p>;
    return <Component {...props} />;
  };
}
const EnhancedList = withLoading(UserList);

// 4. Controlled + uncontrolled in one component (advanced-friendly):
export function Input({ value, defaultValue, onChange, ...rest }) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = controlled ? value : internal;
  return (
    <input
      value={current}
      onChange={(e) => { if (!controlled) setInternal(e.target.value); onChange?.(e); }}
      {...rest}
    />
  );
}

// 5. Prop getters (library-grade APIs): give consumers the props to spread
function useToggle2() {
  const [on, setOn] = useState(false);
  return { on, getTogglerProps: () => ({ onClick: () => setOn(!on) }) };
}
export function Switch() {
  const { on, getTogglerProps } = useToggle2();
  return <button {...getTogglerProps()}>{on ? "ON" : "OFF"}</button>;
}

// Practice: build Tabs/Tab/TabPanel as real compound components with context.
