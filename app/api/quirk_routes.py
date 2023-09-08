from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Quirk

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