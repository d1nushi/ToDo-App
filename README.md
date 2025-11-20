# Todo App — Full Stack (React + Flask + MySQL + Docker)

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


# Technologies Used

## Backend

- Python 3.11

- Flask

- SQLAlchemy ORM

- Flask-CORS

- PyMySQL

## Frontend

- React + Vite

- Axios

- CSS

## DevOps

- Docker

- Docker Compose


