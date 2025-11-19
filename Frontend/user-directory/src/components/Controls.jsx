import React from "react";

export default function Controls({
  search,
  setSearch,
  sortBy,
  setSortBy,
  filterDomain,
  setFilterDomain,
  filterLetter,
  setFilterLetter,
  domains,
}) {
  return (
    <div className="row gy-2 align-items-center mb-3">
      <div className="col-md-5">
        <input
          type="search"
          className="form-control"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort — None</option>
          <option value="first_name">First name (A → Z)</option>
          <option value="email">Email (A → Z)</option>
        </select>
      </div>

      <div className="col-md-2">
        <select className="form-select" value={filterDomain} onChange={e => setFilterDomain(e.target.value)}>
          <option value="">Filter domain</option>
          {domains.map(d => (<option key={d} value={d}>{d}</option>))}
        </select>
      </div>

      <div className="col-md-2">
        <select className="form-select" value={filterLetter} onChange={e => setFilterLetter(e.target.value)}>
          <option value="">First letter</option>
          {Array.from({length:26}, (_,i)=>String.fromCharCode(65+i)).map(ch=>(
            <option key={ch} value={ch}>{ch}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
