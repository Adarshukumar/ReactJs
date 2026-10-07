// Lesson 09 — forms without (and with) a library. Author: Adarsh
import { useState } from "react";

// Hand-rolled: every input wired to state
export function Signup() {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "bad email";
    if (form.password.length < 8) errs.password = "8+ chars";
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) console.log("send to API:", form);
  };

  return (
    <form onSubmit={submit} noValidate>
      <input value={form.email} onChange={set("email")} placeholder="email" />
      {errors.email && <small>{errors.email}</small>}
      <br />
      <input type="password" value={form.password} onChange={set("password")} />
      {errors.password && <small>{errors.password}</small>}
      <br />
      <select value={form.role} onChange={set("role")}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <label>
        <input type="checkbox" checked={form.role === "admin"} readOnly /> admin?
      </label>
      <button>Sign up</button>
    </form>
  );
}

// Scale to 15 fields? Use FormData on submit (uncontrolled + simple):
export function QuickForm() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
  };
  return (
    <form onSubmit={submit}>
      <input name="title" />
      <textarea name="notes" />
      <button>save</button>
    </form>
  );
}

// Real projects: react-hook-form + zod — validation schema + performance.

// Practice: add password-confirm matching to Signup with one error line.
