// Lesson 21 — styling approaches (pick per project). Author: Adarsh

// 1. Plain CSS classes (global stylesheet) — nothing wrong with it!
import "./button.css";
export const Classic = () => <button className="btn btn-primary">go</button>;

// 2. Inline styles: object, camelCase, no pseudo/hover/media queries
export const Inline = () => (
  <button style={{ backgroundColor: "tomato", paddingTop: 8, borderRadius: 4 }}>
    inline
  </button>
);

// 3. CSS Modules: file.css -> locally-scoped class names (Vite/CRA built-in)
// import styles from "./Card.module.css";
// <div className={styles.card}>        <- hashed class, zero collisions

// 4. Conditional classes (the everyday need):
export const Alert = ({ level }) => (
  <div className={["alert", `alert-${level}`, level === "error" && "shake"].filter(Boolean).join(" ")}>
    message
  </div>
);
// (or the tiny `clsx` package: clsx("alert", `alert-${level}`, { shake: isError }))

// 5. Tailwind utilities: compose looks directly in JSX
// <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">

// 6. CSS-in-JS (styled-components emotion): components WITH styles
// const Button = styled.button\`padding: 8px 16px; border-radius: 4px;\`;
// (runtime cost; the ecosystem is shifting to zero-cost alternatives)

// 7. Dynamic values: CSS custom properties
export const Progress = ({ value }) => (
  <div className="bar" style={{ "--fill": `${value}%` }}>
    <span className="bar-fill" />
  </div>
);

// My defaults: small project -> CSS Modules + a variables.css
// medium -> Tailwind    design-system heavy -> component library

// Practice: style a Card with a hover effect WITHOUT inline styles.
