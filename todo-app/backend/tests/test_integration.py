"""
Integration tests for API endpoints

Tests full request-response cycle with test database

Verifies database operations work correctly

"""

import pytest
from app import create_app, db
from app.models import Task

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://todo_user:todo_pass@db:3306/todo_test_db'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

def test_database_connection(client):
    """Test that database connection works"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['database'] == 'connected'

def test_create_task(client):
    """Test task creation and database insertion"""
    response = client.post('/api/tasks', json={
        'title': 'Test Task',
        'description': 'Test Description'
    })
    assert response.status_code == 201
    
    # Verify task is in database
    task = Task.query.filter_by(title='Test Task').first()
    assert task is not None
    assert task.description == 'Test Description'
