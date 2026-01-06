# Auth System

A robust authentication system built with Node.js, Express, and MongoDB, featuring traditional email/password login and Google OAuth integration.

## 🚀 Features

- **User Registration**: Create a new account with email and password.
- **Local Authentication**: Secure login using `bcrypt` for password hashing and `passport-local`.
- **Google OAuth 2.0**: Social login support using Google accounts.
- **Session Management**: Persistent sessions using `express-session` and `connect-mongodb-session`.
- **Protected Routes**: Secure dashboard access only for authenticated users.
- **Responsive Views**: EJS templates for simple and effective user interface.

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [Passport.js](http://www.passportjs.org/)
- **Templating**: [EJS](https://ejs.co/)
- **Security**: [bcrypt](https://www.npmjs.com/package/bcrypt)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Gopichandu923/Auth.git
   cd Auth
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT_NUM=5000
   MONGO_LOCAL_URL=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the application**:
   - For development (with nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## 📁 Project Structure

```text
a:/Auth
├── model/               # Mongoose models (User)
├── views/               # EJS templates
├── databaseconfig.js    # MongoDB connection setup
├── index.js             # Entry point & Express routes
├── passportConfig.js    # Passport strategies configuration
└── package.json         # Project dependencies and scripts
```

## 🔗 Repository
[https://github.com/Gopichandu923/Auth](https://github.com/Gopichandu923/Auth)

