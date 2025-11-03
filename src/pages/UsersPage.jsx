import React, { useEffect, useState } from "react";
import { userService } from "../services/userService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const load = () =>
    userService
      .getAll()
      .then((r) => setUsers(r.data))
      .catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const toggle = (id) => {
    userService
      .toggleStatus(id)
      .then(() => load())
      .catch(console.error);
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.status ? "ACTIVE" : "INACTIVE"}</td>
              <td>
                <button onClick={() => toggle(u.id)}>Toggle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
