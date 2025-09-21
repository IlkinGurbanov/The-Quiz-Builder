Quiz Builder
Overview

Quiz Builder is a full-stack web application that allows users to:

Create quizzes with multiple question types (Boolean, Input, Checkbox)

View all quizzes in a list

View individual quiz details

Delete quizzes

Tech Stack:

Backend: Node.js, Express, TypeScript, Prisma, SQLite

Frontend: Next.js, React, TypeScript

Styling: Tailwind CSS 


Backend Setup
1. Install dependencies
cd backend
npm install

2. Environment Variables

Create a .env file in the backend folder with the following content:

DATABASE_URL=""
PORT= ?

3. Prisma Setup

Generate Prisma client:

npx prisma generate


Create initial SQLite database and run migrations:

npx prisma migrate dev --name init


Verify the database:

npx prisma studio

4. Start the backend server
npm run dev


Server runs on: http://localhost:{port}

Available endpoints:

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/quizzes`     | Create a new quiz |
| GET    | `/quizzes`     | Get all quizzes   |
| GET    | `/quizzes/:id` | Get quiz by ID    |
| DELETE | `/quizzes/:id` | Delete quiz by ID |


Frontend Setup
1. Install dependencies
cd frontend
npm install

2. Environment Variables

Create a .env.local file in frontend:

NEXT_PUBLIC_API_URL=http://localhost:{port}

3. Run frontend
npm run dev


Frontend runs on: http://localhost:{port}
