// Lesson 01 — JSX rules. Author: Adarsh
// JSX = HTML-looking syntax that compiles to function calls.
// It's closer to JS than to HTML — that's why the rules differ.

export function JsxRules() {
  const name = "Adarsh";
  const isActive = true;

  return (
    <div className="card">              {/* 1. className, not class */}
      <label htmlFor="name">Name</label>{/* 2. htmlFor, not for */}

      {/* 3. ONE root element per return (fragments: <>...</>) */}
      <>
        <h2 style={{ color: "crimson" }}>Hi {name}</h2>   {/* 4. JS in {} */}

        {/* 5. every tag closes: <img /> <br /> */}
        <img src="/me.png" alt="Adarsh" />

        {/* 6. style takes an OBJECT, not a string */}
        <p style={{ marginTop: 10, fontSize: "0.9rem" }}>
          {isActive ? "active" : "inactive"}
        </p>

        {/* 7. comments inside JSX look like this */}
        {/* 8. booleans/null render NOTHING — great for toggles */}
        {false && <p>never shown</p>}
        {isActive && <p>shown when active</p>}
      </>
    </div>
  );
}

// What JSX compiles to (React.createElement / jsx() calls):
// jsx("div", { className: "card", children: jsx("h2", { children: ["Hi ", name] }) })

// Practice: convert a small HTML block into JSX fixing all the rules.
