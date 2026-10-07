// Lesson 03 — props: data flows DOWN. Author: Adarsh
import { useState } from "react";   // lesson 07 previews useState here

// Props are READ-ONLY. A component never edits its own props.
function Avatar({ src, alt = "user", size = 48, bordered = false }) {
  // destructure + defaults right in the parameters
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={bordered ? "avatar bordered" : "avatar"}
      style={{ borderRadius: "50%" }}
    />
  );
}

// children: the JSX you nest between tags
function Card({ title, children, footer = null }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      {children}
      {footer}
    </div>
  );
}

// spreading props (use carefully — explicit is usually clearer)
function Profile({ user }) {
  return <Avatar {...user} size={96} bordered />;
}

export function Gallery() {
  const user = { src: "/a.png", alt: "Adarsh" };
  return (
    <Card title="Gallery" footer={<small>— by Adarsh</small>}>
      <Profile user={user} />
      <Avatar src="/b.png" />
    </Card>
  );
}

// Data flows DOWN; events flow UP (callbacks as props):
function Child({ onPing }) {
  return <button onClick={() => onPing("hello from child")}>ping</button>;
}
export function Parent() {
  const [msg, setMsg] = useState("");
  return (
    <>
      <Child onPing={setMsg} />
      <p>{msg}</p>
    </>
  );
}

// Practice: build <Stat label value unit /> and use it 3 times.
