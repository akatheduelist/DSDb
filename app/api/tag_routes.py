from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Tag
# from app.forms import TagForm

tag_routes = Blueprint('tags', __name__)


@tag_routes.route('/')
def tags():
    """
    Query for all tags and returns them in a list of user dictionaries
    """
    tags = Tag.query.all()
    return {'tags': [tag.to_dict() for tag in tags]}


@tag_routes.route('/<int:id>')
def tag(id):
    """
    Query for a tag by id and returns that tag in a dictionary
    """
    tag = Tag.query.get(id)
    return tag.to_dict()


# TO-DO User validation and return errors
@tag_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_tag(id):
    """
    Create a new tag associated with a specific vehicle
    """
    request_data = request.get_json()
    # form['csrf_token'].data = request.cookies['csrf_token']
    tag = Tag.query.get(id)
    tag.id = id
    tag.tag = request_data['tag']
    tag.user_id = request_data['user_id']
    tag.vehicle_id = request_data['vehicle_id']
    db.session.commit()
    return "Success"
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@tag_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_tag(id):
    """
    Deletes a tag by id
    """
    tag = Tag.query.get(id)
    db.session.delete(tag)
    db.session.commit()
    return tag.to_dict()