from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Quirk
from app.forms import QuirkForm

quirk_routes = Blueprint('quirks', __name__)


@quirk_routes.route('/')
def quirks():
    """
    Query for all quirks and returns them in a list of user dictionaries
    """
    quirks = Quirk.query.all()
    return {'quirks': [quirk.to_dict() for quirk in quirks]}


@quirk_routes.route('/<int:id>')
def quirk(id):
    """
    Query for a quirk by id and returns that quirk in a dictionary
    """
    quirk = Quirk.query.get(id)
    return quirk.to_dict()


# TO-DO User validation and return errors
@quirk_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_quirk(id):
    """
    Create a new quirk associated with a specific vehicle
    """
    request_data = request.get_json()
    # form['csrf_token'].data = request.cookies['csrf_token']
    quirk = Quirk.query.get(id)
    quirk.id = id
    quirk.quirk = request_data['quirk']
    quirk.user_id = request_data['user_id']
    quirk.vehicle_id = request_data['vehicle_id']
    db.session.commit()
    return "Success"
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@quirk_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_quirk(id):
    """
    Deletes a quirk by id
    """
    quirk = Quirk.query.get(id)
    db.session.delete(quirk)
    db.session.commit()
    return quirk.to_dict()