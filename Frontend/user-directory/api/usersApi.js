// src/api/usersApi.js
// Calls our Vercel API proxy instead of reqres.in directly

const BASE = "/api/users";  // Local Vercel function

export async function fetchAllUsers() {
  try {
    const res = await fetch(`${BASE}?page=1`);
    if (!res.ok) throw new Error("Failed to fetch users");

    const json = await res.json();
    let users = json.data || [];
    const totalPages = json.total_pages || 1;

    // Fetch remaining pages from our proxy
    const promises = [];
    for (let p = 2; p <= totalPages; p++) {
      promises.push(fetch(`${BASE}?page=${p}`).then(r => r.json()));
    }

    const results = await Promise.all(promises);
    results.forEach(r => {
      if (r && r.data) users = users.concat(r.data);
    });

    return users;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
