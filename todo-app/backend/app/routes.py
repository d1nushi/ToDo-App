from flask import Blueprint, request, jsonify
from sqlalchemy import text
from app import db
from app.models import Task

api = Blueprint("api", __name__)

# HEALTH CHECK
@api.route("/api/health", methods=["GET"])
def health_check():
    try:
        db.session.execute(text("SELECT 1"))
        return jsonify({"status": "healthy", "database": "connected"}), 200
    except Exception as e:
        return jsonify({"status": "unhealthy", "database": "disconnected", "error": str(e)}), 500

# GET LATEST 5 INCOMPLETE TASKS
@api.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = (
        Task.query
        .filter_by(completed=False)
        .order_by(Task.created_at.desc())
        .limit(5)
        .all()
    )

    return jsonify([task.to_dict() for task in tasks]), 200

# CREATE NEW TASK
@api.route("/api/create-tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    if not data or not data.get("title") or not data.get("description"):
        return jsonify({"error": "title and description are required"}), 400

    new_task = Task(
        title=data["title"],
        description=data["description"],
        completed=False
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_dict()), 201

# MARK TASK AS Done
@api.route("/api/tasks/<int:task_id>/complete", methods=["PATCH"])
def complete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.completed = True
    db.session.commit()

    return jsonify({"message": "Task marked as completed"}), 200
