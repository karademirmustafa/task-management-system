# Task Management System

## Project Overview

The Task Management System is a web application designed to help users efficiently manage their tasks. It includes user authentication, a dashboard to display tasks, and the ability to create, read, update, and delete tasks. This README provides an overview of the project and instructions for setting it up.

## Features

- **User Authentication (Signup/Login):** Users can create new accounts and log in using JWT (JSON Web Tokens) authentication.

- **Dashboard:** The dashboard displays tasks for the logged-in user, providing an overview of their tasks.

- **Task Operations (CRUD):** Users can perform the following operations on tasks:
  - **Create:** Create new tasks.
  - **Read:** View task details.
  - **Update:** Modify task information.
  - **Delete:** Remove tasks.

- **Role-Based Access Control (RBAC):** The project includes RBAC to control user access to specific features and actions.

- **Object-Based Access Control (OBAC):** Users can only perform actions on their own tasks.

- **Filtering:** Tasks can be filtered based on their status (waiting, completed, pending) and date (createdAt,dueDate).

- **Sorting:** Advanced sorting capabilities are implemented to allow users to organize their tasks efficiently.

## Backend  (Node.js)

### API Endpoints

1. **User Authentication:**
   - `POST /api/auth/signup`: Create a new user account.
   - `POST /api/auth/login`: Authenticate and log in a user.

2. **Authorization (Authorize/Revoke):**
   - `POST /api/auth/authorize`: Authorize a user.
   - `POST /api/auth/revoke`: Revoke a user's authorization.

3. **Task Management:**
   - `POST /api/tasks`: Create a new task.
   - `GET /api/tasks`: Retrieve all tasks for the logged-in user.
   - `GET /api/tasks/:id`: Retrieve a specific task by ID.
   - `PUT /api/tasks/:id`: Update a task by ID.
   - `DELETE /api/tasks/:id`: Delete a task by ID.
4. **User Profile:**
   - `GET /api/users/profile`: Retrieve the user's own profile.

5. **All Profiles:**
   - `GET /api/users`: Retrieve all user profiles for task assignment.

### Database

The project uses MongoDB as the database to store user and task information.


## Frontend  (React.js)

### User Interface

1. **Login and Signup Pages:** Users can create accounts and log in.

2. **Dashboard Page:** The dashboard displays tasks, allowing users to add, edit, and delete tasks.

### State Management

State management is handled using Redux Toolkit and Context API for specific parts of the application.

## Bonus 

1. **Task Assignment:** Users can assign tasks to different users and track task progress collaboratively.

2. **Advanced Filtering and Sorting:** Advanced filtering and sorting capabilities are added to provide users with powerful tools for organizing their tasks.


## How to run
1. Clone this repository to your computer.
2. You need to have **mongodb** installed on your computer. If you don't, you can run a mongodb instance by using **docker-compose.yml**. 
If you need to use docker-compose.yml, you can run this command :
```
docker-compose up -d
```
3. You need to specify the **mongodb** url in the **.env** file.
4. You need to have **npm** installed. 
5. Inside the server and client folder, run the commands below.
   
## Getting Started
After starting Docker -->
Follow these steps to set up and run the project locally:

1. **Clone Repository:**
   - Clone this repository to your local machine.

   ```bash
   git clone https://github.com/karademirmustafa/task-management-system.git
   cd task-management-system
   ```
2. Install Dependencies:

Navigate to the frontend and backend directories and install the required dependencies.


    
    # Frontend dependencies
    cd client
    npm install

    # Backend dependencies
    cd ../server
    npm install
    
3. Configure Backend:

Create a .env file in the backend directory and configure your MongoDB database connection settings, JWT secret key, and other environment variables.

4. Start Servers:

Start the backend and frontend servers.
    ```
# Start the backend server
    cd ../server
    npm start:dev or npm start:prod
    
Note : npm start:dev --> development, npm start:prod --> production  .env

# Start the frontend development server
    cd ../client
    npm start
    

5. Access the Application:

Access the application in your web browser at http://localhost:3000.

Now, you have a complete "Getting Started" section in markdown format that provides clear instructions on how to clone the repository, install dependencies, configure the backend, start the servers, and access the application locally.

## Live Demo:

Frontend: [Live Demo](https://task-management-system-gamma.vercel.app)
Backend: [Live Demo](https://task-management-system-api.onrender.com)


(Please note that the backend may run slower as it is hosted on a low-CPU environment.)
Now, you have the live demo links for both the frontend and backend in your README file, allowing users to access the deployed application directly.


   
