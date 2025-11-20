from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.config import Config

# SQLAlchemy instance
db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # attach db to this app
    db.init_app(app)

    # enable CORS for frontend later
    CORS(app)

    # register blueprints here
    from app.routes import api
    app.register_blueprint(api)

    return app



def test_db_connection():
    """Test database connection and return status"""
    try:
        # Execute a simple query
        db.session.execute('SELECT 1')
        return True, "Database connected successfully!"
    except Exception as e:
        return False, f"Database connection failed: {str(e)}"
