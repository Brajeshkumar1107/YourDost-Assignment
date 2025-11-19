const BASE = "https://reqres.in/api/users";

export async function fetchAllUsers() {
  try {
    // first page: get total pages
    const res = await fetch(`${BASE}?page=1`);
    if (!res.ok) throw new Error("Failed to fetch users");
    const json = await res.json();
    const pages = json.total_pages || 1;
    let users = json.data || [];

    // fetch remaining pages in parallel
    const promises = [];
    for (let p = 2; p <= pages; p++) {
      promises.push(fetch(`${BASE}?page=${p}`).then(r => r.json()));
    }
    const results = await Promise.all(promises);
    results.forEach(r => {
      if (r && r.data) users = users.concat(r.data);
    });
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
