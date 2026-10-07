// Lesson 13 — useRef: values that survive renders WITHOUT causing them. Author: Adarsh
import { useRef, useState, useEffect } from "react";

// Use 1 — hold a DOM node and poke at it imperatively
export function FocusDemo() {
  const inputRef = useRef(null);        // { current: null }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>focus it</button>
    </>
  );
}

// Use 2 — mutable box across renders (render count, latest value, timer id)
export function RenderCount() {
  const renders = useRef(0);
  renders.current += 1;                 // mutating ref does NOT re-render
  return <p>rendered {renders.current}x</p>;
}

// Use 3 — interval id storage
export function Stopwatch() {
  const [ms, setMs] = useState(0);
  const idRef = useRef(null);
  const start = () => { idRef.current = setInterval(() => setMs((m) => m + 100), 100); };
  const stop = () => clearInterval(idRef.current);
  return <p>{ms}ms <button onClick={start}>go</button><button onClick={stop}>stop</button></p>;
}

// ref vs state:
//   state  -> changes RE-RENDER, display data
//   ref    -> changes silently, for DOM + instance bookkeeping
//   (reading refs during render is forbidden — read in handlers/effects)

// forwardRef: letting PARENTS reach YOUR dom node
import { forwardRef } from "react";
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return <input ref={ref} className="fancy" {...props} />;
});
export function Parent() {
  const ref = useRef(null);
  return <FancyInput ref={ref} placeholder="type" />;
}

// useEffect can return cleanup:
export function LogMount() {
  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);
  return null;
}

// Practice: build usePrevious(value) hook with a ref.
