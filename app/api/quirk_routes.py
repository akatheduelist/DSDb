from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Quirk

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