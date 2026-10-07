// Lesson 22 — client-side routing (react-router v6+). Author: Adarsh
// npm i react-router-dom

// App structure (commented imports — this file is study reference):
// import { BrowserRouter, Routes, Route, NavLink, useParams,
//          useNavigate, useSearchParams, Outlet } from "react-router-dom";

export function AppRoutes() {
  return null;   // replaced below conceptually
}

// <BrowserRouter>                 <- wraps the app (one router only)
//   <Layout>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/users" element={<Users />}>
//         <Route path=":userId" element={<UserDetail />} />   <- nested
//       </Route>
//       <Route path="/old" element={<Navigate to="/" replace />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   </Layout>
// </BrowserRouter>

// Navigation: <NavLink> gets active classes; <Link> is plain:
// <NavLink to="/users" className={({ isActive }) => isActive ? "on" : ""}>Users</NavLink>

// URL params + navigation from JS:
function UserDetail() {
  return null;
}
// function UserDetail() {
//   const { userId } = useParams();              <- /users/:userId
//   const navigate = useNavigate();
//   return <button onClick={() => navigate("/")}>home</button>;
// }

// Query strings:
// const [params, setParams] = useSearchParams();
// params.get("q");  setParams({ q: "new" });

// Nested layout outlets:
// function Users() { return (<div><h1>Users</h1><Outlet /></div>); }
//                                          ^ child route renders here

// Data APIs (loader/action) exist in v6.4+ — learn them after the basics.

// Practice: 3-page app: home / products / products/:id with an active nav.
