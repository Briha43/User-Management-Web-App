# 👥 User Management Web App

A dynamic and beginner-friendly **Express.js + MySQL** web application that allows you to manage users in a structured way. This project helped me strengthen my backend web development concepts, especially:

- Express.js routing & middleware
- EJS templating for dynamic views
- Handling forms and user input
- Executing SQL queries to manipulate real database data
- Displaying alerts and handling response redirects smoothly

## 📌 Features

- ✅ View all registered users
- ➕ Add new users via a form
- 🔢 See total user count
- 📢 Alert pop-ups for user actions (e.g. user added)
- 🎭 Uses `faker` to generate test users with fake but realistic data

## 🛠️ Tech Stack

| Category      | Tools Used                    |
|---------------|-------------------------------|
| Backend       | Node.js, Express.js           |
| Frontend View | EJS (Embedded JavaScript)     |
| Database      | MySQL                         |
| Utilities     | Faker.js, Nodemon, MySQL2     |

## 📦 Packages Used

- **express** – for building server and handling routes
- **ejs** – for rendering dynamic HTML pages
- **mysql2** – for interacting with MySQL DB using async/await
- **faker** – to generate random fake data like usernames, emails, IDs
- **nodemon** – for development, to auto-restart the server on changes

## 📂 Folder Structure
User-Management-Web-App/
│
├── views/ # EJS templates
│ ├── home.ejs
│ └── newuser.ejs
│
├── public/ # Static files (if any)
├── index.js # Main server file
├── package.json
└── README.md


## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MySQL server installed and running

### Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/User-Management-Web-App.git
   cd User-Management-Web-App
2. Install dependencies
  npm install

3. Set up your database

  Create a user table with fields: id, username, email, password
  (Optional) Use Faker to generate seed data

4 Start the app
    node index.js

5 Visit in browser:
http://localhost:3000/users

🌟 Support This Project
If you find this project helpful, please consider giving it a star ⭐ on GitHub!

Contact
Feel free to connect with me on LinkedIn(BRIHA MALIK) or explore more of my work on GitHub
