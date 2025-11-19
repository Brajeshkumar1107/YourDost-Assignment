const BASE = "https://corsproxy.io/?https://reqres.in/api/users";

export async function fetchAllUsers() {
  try {
    const res = await fetch(`${BASE}?page=1`);
    if (!res.ok) throw new Error("Failed to fetch users");

    const json = await res.json();
    let users = json.data || [];
    const totalPages = json.total_pages || 1;

    const promises = [];
    for (let p = 2; p <= totalPages; p++) {
      promises.push(fetch(`${BASE}?page=${p}`).then(r => r.json()));
    }

    const results = await Promise.all(promises);
    results.forEach(r => {
      if (r.data) users = users.concat(r.data);
    });

    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
