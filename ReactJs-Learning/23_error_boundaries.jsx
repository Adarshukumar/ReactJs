// Lesson 23 — error boundaries: catch render crashes. Author: Adarsh
import { Component } from "react";

// ONLY class components can be boundaries (still true today):
class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };                          // render the fallback UI
  }

  componentDidCatch(error, info) {
    console.error("caught:", error, info.componentStack);   // log to service
  }

  render() {
    if (this.state.error) {
      return <this.props.fallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage — wrap anything fragile:
export function App() {
  return (
    <ErrorBoundary fallback={({ error }) => <p>oops: {error.message}</p>}>
      <RiskyWidget />
    </ErrorBoundary>
  );
}

function RiskyWidget() {
  throw new Error("demo crash");              // caught by the boundary!
}

// What boundaries CATCH: errors in render/lifecycle/constructors BELOW them.
// What they DON'T: event handlers, async code, effects — those use try/catch.

// Event/async errors are normal try/catch:
export function SafeButton() {
  const onClick = async () => {
    try { await fetch("/api"); }
    catch (e) { console.error("handled:", e); }
  };
  return <button onClick={onClick}>safe</button>;
}

// Strategy: one boundary per meaningful region (sidebar, feed, widget) —
// a crash kills the widget, not the page. Add reset via key prop change.

// Practice: a boundary with a "try again" button that resets state.
