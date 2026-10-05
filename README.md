# Todo App — Full Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

The project contains:

- **Frontend:** React (Vite) SPA  
- **Backend:** Python Flask REST API  
- **Database:** MySQL  
- **Docker Compose:** runs all 3 services together  


This README explains how to build, run, test, and understand the entire system.

##  Features

- Add new tasks (title + description)
- View the **5 most recent uncompleted tasks**
- Mark tasks as completed
- Tasks automatically update and completed tasks disappear
- Backend health check at `/api/health`
- Simple clean UI (SPA)
- Fully Dockerized


# Running the Entire Project with Docker

### Change Directory

- cd todo-app

### Build images

- docker compose build 

### Build images

- docker compose up

### Open the frontend + Backend in browser

- http://localhost:3000

### Backend for Testing

- http://localhost:5000



