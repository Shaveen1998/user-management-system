# MERN Stack User management Application README

Welcome to the README for the stack user management application developed on MERN stack! This document will guide you through the setup process, technologies used, and other important details about the project.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)

## Technologies Used

- **MongoDB**: NoSQL database used for storing application data.
- **Express.js**: Web application framework for Node.js used for building the server-side logic.
- **React.js(Vite)**: JavaScript library for building user interfaces.
- **Node.js/Express JS**: JavaScript node js framework .
- **Tailwind CSS**: Utility-first CSS framework used for styling the application.

## Environment Variables

Before running the application, make sure to create a `.env` file in the root directory of the project. Specify the following environment variables in the `.env` file:

- `PORT`: Port number on which the server will run.
- `MONGO_URI`: URI for connecting to your MongoDB database.
- `SECRET`: Secret key used for encrypting and decrypting data (e.g., JWT tokens).

Use the following for setup `.env` file:

- PORT=3000
- MONGO_URI=mongodb+srv://shaveenleousj:8bUcZR6Qt9Mc9PZQ@usercluster.re3pr.mongodb.net/?retryWrites=true&w=majority&appName=userCluster
- SECRET=ajasdljaklsdklanck

## Setup Instructions

To set up the application locally, please follow these steps:

1. Clone the repository to your local machine: git clone <repository-url>

2. Navigate to the project directory: cd <project-directory>

3. Install dependencies for the server:
   cd frontend
   npm install

4. Install dependencies for the client:
   cd backend
   npm install

5. Start the server:
   node index.js
6. Start the client:
   npm run dev

7. Visit `http://localhost:5173` in your browser to view the application.
