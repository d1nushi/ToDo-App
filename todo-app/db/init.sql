CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE IF NOT EXISTS task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO task (title, description, completed, created_at) VALUES
('Setup project structure', 'Create folders and files for Flask backend', FALSE, NOW() - INTERVAL 5 MINUTE),
('Configure database', 'Setup MySQL connection and create tables', FALSE, NOW() - INTERVAL 4 MINUTE),
('Build REST API', 'Implement POST, GET, and PATCH endpoints', FALSE, NOW() - INTERVAL 3 MINUTE),
('Create React UI', 'Build task form and task list components', FALSE, NOW() - INTERVAL 2 MINUTE),
('Write tests', 'Add unit and integration tests with coverage', FALSE, NOW() - INTERVAL 1 MINUTE),
('Deploy with Docker', 'Containerize all services and test', FALSE, NOW());
