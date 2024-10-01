# Task Manager API

## Overview
The Task Manager API is a RESTful API built with Node.js and Express.js for managing tasks. It allows users to perform various operations related to tasks, including creating, retrieving, updating, and deleting tasks. The API also supports filtering and sorting tasks based on completion status and priority levels.

## Features
- Create tasks with a title, description, completion status, and priority level.
- Retrieve all tasks or specific tasks by ID.
- Update task details.
- Delete tasks.
- Filter tasks by completion status (completed or not).
- Sort tasks by creation date.
- Retrieve tasks by priority level (low, medium, high).

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/airtribe-projects/task-manager-api-Tejas150.git
   cd task-manager-api-Tejas150
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `task.json` file in the root directory with the following structure:
   ```json
   {
     "tasks": []
   }
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be running on `http://localhost:3000`.

## API Endpoints

### 1. Get All Tasks
- **Endpoint:** `GET /tasks`
- **Query Parameters:**
  - `completed` (optional): Filter by completion status (`true` or `false`).
  - `sort` (optional): Sort tasks by creation date (`asc` or `desc`).
- **Response:**
  - Returns an array of tasks.
- **Example `curl` request:**
  ```bash
  curl -X GET "http://localhost:3000/tasks?completed=true&sort=asc"
  ```

### 2. Get Task by ID
- **Endpoint:** `GET /tasks/:id`
- **Response:**
  - Returns the task object if found, or a 404 error if not.
- **Example `curl` request:**
  ```bash
  curl -X GET "http://localhost:3000/tasks/1"
  ```

### 3. Create a Task
- **Endpoint:** `POST /tasks`
- **Request Body:**
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "priority": "medium"
  }
  ```
- **Response:**
  - Returns the created task object.
- **Example `curl` request:**
  ```bash
  curl -X POST "http://localhost:3000/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "priority": "medium"
  }'
  ```

### 4. Update a Task
- **Endpoint:** `PUT /tasks/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "priority": "high"
  }
  ```
- **Response:**
  - Returns the updated task object.
- **Example `curl` request:**
  ```bash
  curl -X PUT "http://localhost:3000/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "priority": "high"
  }'
  ```

### 5. Delete a Task
- **Endpoint:** `DELETE /tasks/:id`
- **Response:**
  - Returns a message indicating the task has been deleted.
- **Example `curl` request:**
  ```bash
  curl -X DELETE "http://localhost:3000/tasks/1"
  ```

### 6. Get Tasks by Priority Level
- **Endpoint:** `GET /tasks/priority/:level`
- **Path Parameters:**
  - `level`: Priority level (`low`, `medium`, or `high`).
- **Response:**
  - Returns an array of tasks with the specified priority level.
- **Example `curl` request:**
  ```bash
  curl -X GET "http://localhost:3000/tasks/priority/medium"
  ```

## Testing the API
You can use tools like Postman or cURL to test the API endpoints. For example, to get all tasks, send a `GET` request to `http://localhost:3000/tasks`.

### Running Tests
To run tests for the project, use the following command:
```bash
npm test
```
