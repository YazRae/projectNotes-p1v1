import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout.js";
import Layout from "./components/Layout.js";
import Public from "./components/Public.js";
import Login from "./features/auth/Login.js";
import Welcome from "./features/auth/Welcome.js";
import EditNote from "./features/notes/EditNote.js";
import NewNote from "./features/notes/NewNote.js";
import NotesList from "./features/notes/NotesList.js";
import EditUser from "./features/users/EditUser.js";
import NewUserForm from "./features/users/NewUserForm";
import UsersList from "./features/users/UsersList.js";
import PreFetch from "./features/auth/PreFetch.js";
import PersistLogin from "./features/auth/PersistLogin.js";
import RequireAuth from "./features/auth/RequireAuth.js";
import { ROLES } from "./config/roles.js";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("CRUD APP");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />

        {/* Protected */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<PreFetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path="new" element={<NewUserForm />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path="new" element={<NewNote />} />
                  <Route path=":id" element={<EditNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Protected End */}
      </Route>
    </Routes>
  );
}

export default App;
