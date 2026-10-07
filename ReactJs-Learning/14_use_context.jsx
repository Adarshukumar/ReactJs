// Lesson 14 — useContext: dependency injection for React. Author: Adarsh
import { createContext, useContext, useState } from "react";

// 1. Create the context (once, near the top of the app)
const ThemeContext = createContext(null);
const UserContext = createContext(null);

// 2. Provide it high in the tree
export function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ name: "Adarsh", role: "admin" }}>
        <Layout />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 3. Consume it ANYWHERE below — no prop drilling
function Layout() { return <Toolbar />; }
function Toolbar()  { return <ThemedButton />; }     // nothing passed through!

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);   // <- the magic
  const user = useContext(UserContext);
  return (
    <button className={`btn-${theme}`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {user.name} / toggle
    </button>
  );
}

// Gotchas:
// - every Provider value change re-renders ALL consumers -> keep value stable
//   (wrap objects in useMemo, lesson 17)
// - context is NOT a state manager — it is a DELIVERY mechanism
// - auth/user/theme/language: perfect. Rapidly-changing data: bad fit.

// Custom hook wrapper (the convention):
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeContext.Provider");
  return ctx;
}

export function ThemedHeader() {
  const { theme } = useTheme();
  return <h1 className={`head-${theme}`}>Site title</h1>;
}

// Practice: create AuthContext with login(name)/logout() usable from any depth.
