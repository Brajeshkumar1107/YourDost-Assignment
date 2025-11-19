// api/users.js
// Vercel serverless function to bypass CORS + 401/403 from reqres.in

export default async function handler(req, res) {
  try {
    // Extract query string if present (e.g., ?page=1)
    const query = req.url.includes("?") ? req.url.split("?")[1] : "";
    const targetUrl = `https://reqres.in/api/users${query ? "?" + query : ""}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Serverless Error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
