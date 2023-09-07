from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import DougScore

dougscore_routes = Blueprint('dougscores', __name__)


@dougscore_routes.route('/')
def dougscores():
    """
    Query for all dougscores and returns them in a list of dougscore dictionaries
    """
    dougscores = DougScore.query.all()
    return {'dougscores': [dougscore.to_dict() for dougscore in dougscores]}


@dougscore_routes.route('/<int:id>')
def dougscore(id):
    """
    Query for a dougscore by id and returns that dougscore in a dictionary
    """
    dougscore = DougScore.query.get(id)
    return dougscore.to_dict()