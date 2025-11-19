# Frontend – User Directory Table (React + Vite + Bootstrap)

This is the **Frontend part** of my YourDOST SDE Intern Assignment.  
The application fetches user data from an API and displays it in a **searchable, sortable, filterable, and paginated table**.

---

# Tech Stack
- **React (Vite)**
- **Bootstrap 5**
- Fetch API
- CSS (custom styling)

---

# API Used
The project uses the free ReqRes API: https://reqres.in/api/users


All pages are fetched so the table can support full search, filter, and sort features.

---

# Features Implemented

### ✔ Fetch & Display User List
- Loads all pages of users from the API
- Shows avatar, full name, and email

### Search
- Search by **name**  
- Search by **email**

### Sort
- Sort by **first name**
- Sort by **email**

### Filter
- Filter by **email domain**
- Filter by **first letter** of first name

### Pagination
- Client-side pagination
- Page numbers, next/prev, first/last controls

### Loading & Error States
- Bootstrap loading spinner
- Error message if API fails

### Responsive UI
- Works on desktop, tablet, and mobile
- Bootstrap table with responsive wrapper

---

# Project Structure

src/
api/
usersApi.js → API calls
components/
Controls.jsx → Search, sort, filters UI
UserTable.jsx → Table UI
Pagination.jsx → Pagination component
App.jsx → Main app logic
main.jsx → React entry point
index.css → Custom styling


---

#  Run Locally

### 1. Install dependencies
```bash
npm install

2. Start development server
npm run dev

App runs at: http://localhost:5173

📦 Build for Production
npm run build

Preview production build:
npm run preview