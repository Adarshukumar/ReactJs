// Lesson 19 — children & composition over configuration. Author: Adarsh

// children = whatever you nest between the component's tags
export function Card({ title, children, footer }) {
  return (
    <section className="card">
      <header>{title}</header>
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

// Render props: pass a FUNCTION as a prop to customize rendering
export function Mouse({ children }) {
  // children as function — receives live data
  return children({ x: 10, y: 20 });
}
export function Demo() {
  return <Mouse>{({ x, y }) => <p>cursor at {x},{y}</p>}</Mouse>;
}

// Layout components: components that ARRANGE other components
export function Split({ left, right }) {   // slot props pattern
  return (
    <div className="split">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// Composition replaces inheritance (React has NO component inheritance):
export function App() {
  return (
    <Card
      title="Dashboard"
      footer={<small>— Adarsh</small>}
    >
      <Split
        left={<p>sidebar</p>}
        right={<p>content</p>}
      />
    </Card>
  );
}

// Specialization: wrap a generic component with defaults
function Button({ variant = "primary", ...props }) {
  return <button className={`btn-${variant}`} {...props} />;
}
export const DangerButton = (props) => <Button variant="danger" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;

// Practice: build a <Modal> with header/children/footer slots.
