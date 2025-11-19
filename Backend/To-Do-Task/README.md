# 🚀 Backend – To-Do CRUD API  
### Spring Boot + JSON File Storage

![Java](https://img.shields.io/badge/Java-17-red?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![JSON](https://img.shields.io/badge/Storage-JSON-blue?style=for-the-badge&logo=json)
![Status](https://img.shields.io/badge/Assignment-YourDOST-orange?style=for-the-badge&logo=todoist)

This module implements the **Backend part** of the YourDOST SDE Intern Assignment.  
It is a lightweight **REST API** for managing To-Do items using a **local JSON file** for persistent storage. No database required.

---

## Features

### Core CRUD Operations
| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| GET    | `/todos`         | Get all todo items                |
| GET    | `/todos/{id}`    | Get a specific todo by ID         |
| POST   | `/todos`         | Create a new todo                 |
| PUT    | `/todos/{id}`    | Update an existing todo           |
| DELETE | `/todos/{id}`    | Delete a todo                     |

### Bonus Feature
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| PUT    | `/todos/status/{id}`   | Update only the completed status |

### Additional Improvements
✔ JSON file persistent storage  
✔ Input validation using `@Valid`  
✔ Global exception handling  
✔ Clean architecture (Controller–Service–Repository–DTO)  
✔ Auto-generated `todos.json` file  
✔ Proper HTTP status codes:
- 200 OK  
- 201 Created  
- 204 No Content  
- 400 Bad Request  
- 404 Not Found  

---

## Project Structure

backend/
└── src/main/java/com/assignment/
├── controller/ → REST endpoints
├── service/ → Business logic
├── repository/ → JSON read/write
├── dto/ → Request DTOs
├── model/ → Todo model
├── exception/ → Global exception handler
└── TodoApplication.java

todos.json ← Persistent storage file

## JSON Storage Example

```json
[
  {
    "id": 1,
    "title": "Learn Spring Boot",
    "description": "Backend assignment task",
    "completed": false
  }
]


How to Run the Backend
1. Navigate to the backend folder
cd backend

2. Install dependencies
mvn clean install

3. Start the application
mvn spring-boot:run

The API runs at:

API Examples
Create a Todo
POST /todos
Content-Type: application/json

{
  "title": "Finish Assignment",
  "description": "Complete the backend module",
  "completed": false
}

Update Todo
PUT /todos/1
{
  "title": "Finish Assignment - Updated",
  "completed": true
}

Update Only Status
PUT /todos/status/1
{
  "completed": true
}

Get All Todos
GET /todos

Delete Todo
DELETE /todos/1
