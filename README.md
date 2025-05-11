# Task Manager

A full-stack web application for managing your daily tasks, built with React, Redux, Node.js, Express, MongoDB, Bootstrap, and jQuery.

## 🚀 Project Overview
The Task Manager helps you organize, track, and manage your tasks efficiently. You can add, edit, delete, and view tasks, as well as mark them as pending, in-progress, or completed. The dashboard provides a clear overview of all your tasks with a modern, responsive UI.

## ✨ Features
- Responsive dashboard to view all tasks
- Add new tasks with title, description, due date, and status
- Edit and delete existing tasks
- Status badges for task progress (pending, in-progress, completed)
- Sortable task cards (drag-and-drop with jQuery UI)
- Tooltips and smooth animations (jQuery)
- Persistent storage with MongoDB
- RESTful API with Express.js

## 🛠️ Tech Stack
- **Frontend:** React, Redux, Bootstrap, jQuery, jQuery UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## 📦 Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB (running locally on default port)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd fsui-assignment
```

### 2. Install dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd ../client1
npm install
```

### 3. Start the application
#### Start MongoDB (if not already running)
Make sure your MongoDB server is running locally on `mongodb://localhost:27017`.

#### Start Backend Server
```bash
cd ../server
node ../server.js
```

#### Start Frontend
```bash
cd ../client1
npm start
```

### 4. Open in Browser
Visit [http://localhost:3002](http://localhost:3002) to use the Task Manager.

## 🖥️ Usage
- **Dashboard:** View all tasks, drag to reorder, see status badges.
- **Add Task:** Click "+ Add New Task" to create a new task.
- **Edit/Delete:** Use the edit and delete buttons on each task card.
- **Status:** Track progress with colored badges.

## 📁 Project Structure
```
fsui-assignment/
├── client1/         # React frontend
├── server.js       # Express backend
└── ...
```

## 🙏 Credits
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [jQuery UI](https://jqueryui.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

Feel free to customize and enhance this project for your needs! 
