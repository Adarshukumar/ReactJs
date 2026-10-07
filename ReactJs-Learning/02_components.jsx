// Lesson 02 — components are functions returning JSX. Author: Adarsh
// Naming: ALWAYS PascalCase (or JSX reads it as a plain <div>-like tag).

function ProfileCard({ name, role }) {        // see lesson 03 for props
  return (
    <article>
      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  );
}

// Composition: components inside components
export function Team() {
  return (
    <section>
      <h2>My Team</h2>
      <ProfileCard name="Adarsh" role="Developer" />
      <ProfileCard name="Riya" role="Designer" />
    </section>
  );
}

// Separate files: one component per file (ProfileCard.jsx),
// export default function ProfileCard() {...}, import it where used.

// A component can also be ARBITRARILY complex behind a simple interface:
function Badge({ count }) {
  const label = count > 99 ? "99+" : String(count);
  return <span className="badge">{label}</span>;
}

// Rules of components:
// 1. pure-ish: same props -> same JSX (no fetching, no DOM poking in render)
// 2. never define a component INSIDE another component (remounts + breaks state)

export function Inbox() {
  return (
    <nav>
      Inbox <Badge count={120} /> <Badge count={7} />
    </nav>
  );
}

// Practice: extract a <Price amount currency /> component used 3 times.
