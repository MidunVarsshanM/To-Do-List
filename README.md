# 📝 To-Do List Web App

A clean and responsive To-Do List web application built using **HTML**, **CSS**, **JavaScript**, and **Firebase Authentication**. Users can securely log in with their Google account, add tasks with due dates, mark them as complete, and delete them. The app sorts tasks by due date and places completed tasks at the bottom.

---

## ✅ Features

- 🔐 Google Login using Firebase Authentication
- ➕ Add tasks with due dates
- ✅ Mark tasks as complete/incomplete
- ⬇️ Completed tasks move to the bottom
- 📅 Tasks sorted by due date
- 🗑️ Delete tasks
- 🔓 Logout button included
- 💾 Data stored locally using `localStorage`
- 📱 Fully responsive design

---

## 🧠 Assumptions Made

- A **Logout button** is added for users to securely sign out.
- Tasks are **sorted by due date** to prioritize upcoming tasks.
- **Completed tasks move to the bottom** of the list automatically.

---

## 🏗️ Architecture Diagram

```plaintext
User Browser
     │
     ▼
Login via Google
     │
     ▼
Firebase Authentication (Client SDK)
     │
     ▼
index.html (HomePage)
     │
     ├── Add / Delete / Mark Complete
     └── Stored in localStorage
     ▼
DOM updates via JavaScript
