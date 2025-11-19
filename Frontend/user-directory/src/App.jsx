import React, { useEffect, useMemo, useState } from "react";
import { fetchAllUsers } from "./api/usersApi";
import Controls from "./components/Controls";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";

export default function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // controls
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [filterLetter, setFilterLetter] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // arbitrary nice page size

  useEffect(() => {
    setLoading(true);
    fetchAllUsers()
      .then(users => {
        setAllUsers(users);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  // derived: available domains
  const domains = useMemo(() => {
    const set = new Set();
    allUsers.forEach(u => {
      const parts = (u.email || "").split("@");
      if (parts.length === 2) set.add(parts[1].toLowerCase());
    });
    return Array.from(set);
  }, [allUsers]);

  // Apply search / filter / sort
  const processed = useMemo(() => {
    let data = [...allUsers];

    // search: check first_name, last_name, email (case-insensitive)
    if (search.trim()) {
      const s = search.toLowerCase();
      data = data.filter(u =>
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(s) ||
        (u.email || "").toLowerCase().includes(s)
      );
    }

    // filter domain
    if (filterDomain) {
      data = data.filter(u => (u.email || "").toLowerCase().endsWith(filterDomain.toLowerCase()));
    }

    // filter by first letter
    if (filterLetter) {
      data = data.filter(u => (u.first_name || "").charAt(0).toUpperCase() === filterLetter);
    }

    // sort
    if (sortBy === "first_name") {
      data.sort((a, b) => a.first_name.localeCompare(b.first_name));
    } else if (sortBy === "email") {
      data.sort((a, b) => a.email.localeCompare(b.email));
    }

    return data;
  }, [allUsers, search, filterDomain, filterLetter, sortBy]);

  // pagination math
  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));

  useEffect(() => {
    // if processed reduces total pages, ensure current page is valid
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [processed.length, totalPages, currentPage]);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processed.slice(start, start + pageSize);
  }, [processed, currentPage]);

  return (
    <div className="container-xl py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="mb-0">User Directory</h4>
            <small className="text-muted">Data from reqres.in</small>
          </div>

          <Controls
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterDomain={filterDomain}
            setFilterDomain={setFilterDomain}
            filterLetter={filterLetter}
            setFilterLetter={setFilterLetter}
            domains={domains}
          />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <>
              <UserTable users={pageData} />

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing <strong>{pageData.length}</strong> of <strong>{processed.length}</strong> users
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPage={(p) => setCurrentPage(p)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="text-center mt-3 text-muted small">
        Tip: Use search or filters to narrow the list.
      </div>
    </div>
  );
}
