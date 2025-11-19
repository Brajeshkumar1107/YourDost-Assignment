import React from "react";

export default function UserTable({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No users found.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle bg-white">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Avatar</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.id}>
              <td>{idx + 1}</td>
              <td>
                <img src={u.avatar} alt={`${u.first_name}`} className="table-img" />
              </td>
              <td>{u.first_name} {u.last_name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
