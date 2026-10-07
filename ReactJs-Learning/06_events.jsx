// Lesson 06 — events: React's synthetic event system. Author: Adarsh
import { useState } from "react";

export function Events() {
  const [text, setText] = useState("");

  // handlers receive a synthetic event (same shape as DOM, cross-browser)
  const handleClick = (e) => {
    e.preventDefault();                       // stop default browser action
    console.log("clicked", e.type, e.target.tagName);
  };

  const handleChange = (e) => setText(e.target.value);   // input's value

  const handleSubmit = (e) => {
    e.preventDefault();                       // form would reload the page!
    alert(`submitted: ${text}`);
  };

  const handleKeys = (e) => {
    if (e.key === "Enter") console.log("enter pressed");
    if (e.ctrlKey && e.key === "s") { e.preventDefault(); console.log("saved"); }
  };

  return (
    <div>
      {/* onClick, onChange, onSubmit, onKeyDown — camelCase, functions */}
      <button onClick={handleClick}>Click</button>

      {/* inline arrow with a custom argument */}
      <button onClick={() => console.log("row 42 clicked")}>custom arg</button>

      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleChange} onKeyDown={handleKeys} />
        <button type="submit">Send</button>
      </form>

      {/* capture phase + stopPropagation: */}
      <div onClickCapture={() => console.log("capture first")}>
        <button onClick={(e) => { e.stopPropagation(); console.log("only me"); }}>
          isolated
        </button>
      </div>
    </div>
  );
}

// event pooling is GONE in React 17+ — access e fields anytime.
// mouse: onMouseEnter/Leave/Move · focus: onFocus/onBlur · touch: onTouchStart

// Practice: build a search box that calls onSearch(text) on Enter only.
