import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const USER_TYPES = {
  PUBLIC: "Public User",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

const CURRENT_USER_TYPE = USER_TYPES.PUBLIC;
function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: 8,
          backgroundColor: "rgb(110,110,210)",
          borderBottom: "1px solid red",
          color: "white",
          marginBottom: 8,
        }}
      >
        <Link style={{ color: "white" }} to={"/"}>
          Home
        </Link>
        {CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
        CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ? (
          <>
            <Link style={{ color: "white" }} to={"/user"}>
              User
            </Link>
            <Link style={{ color: "white" }} to={"/myProfile"}>
              User Profile
            </Link>
          </>
        ) : null}
        {CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ? (
          <Link style={{ color: "white" }} to={"/admin"}>
            Admin
          </Link>
        ) : null}

        <div>You are logged in as: {CURRENT_USER_TYPE}</div>
      </div>
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicElement>
            <Home />{" "}
          </PublicElement>
        }
      ></Route>
      <Route
        path="/user"
        element={
          <UserElement>
            <User />
          </UserElement>
        }
      ></Route>
      <Route
        path="/myProfile"
        element={
          <UserElement>
            <User />
          </UserElement>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <AdminElement>
            <Admin />{" "}
          </AdminElement>
        }
      ></Route>
      <Route path="*" element={<div>Page not found.</div>}></Route>
    </Routes>
  );
}

function Home() {
  return <div>Home Page</div>;
}
function User() {
  return <div>User Page</div>;
}
function Admin() {
  return <div>Admin Page</div>;
}
function PublicElement({ children }) {
  return <> {children}</>;
}
function UserElement({ children }) {
  if (
    CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
    CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER
  ) {
    return <> {children}</>;
  } else {
    <Navigate to="/" />;
  }
}
function AdminElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <> {children}</>;
  } else {
    return <>You don't have access to this page!</>;
  }
}

export default App;
