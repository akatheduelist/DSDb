from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import DougScore
from sqlalchemy import desc

dougscore_routes = Blueprint('dougscores', __name__)


@dougscore_routes.route('/')
def dougscores():
    """
    Query for all dougscores and returns them in a list of dougscore dictionaries
    """
    dougscores = DougScore.query.all()
    return {'dougscores': [dougscore.to_dict() for dougscore in dougscores]}


@dougscore_routes.route('/topten')
def top_ten_vehicles():
    """
    Query for top ten total dougscores and returns them in a list of score dictionaries
    """
    top_ten = DougScore.query.order_by(desc(DougScore.dougscore_total)).limit(10)
    return {'top_ten': [ten.to_dict_with_vehicle() for ten in top_ten]}


@dougscore_routes.route('/worstrating')
def worst_vehicles():
    """
    Query for bottom ten total dougscores and returns them in a list of score dictionaries
    """
    bottom_ten = DougScore.query.order_by(DougScore.dougscore_total).limit(10)
    return {'bottom_ten': [ten.to_dict_with_vehicle() for ten in bottom_ten]}


@dougscore_routes.route('/coolest')
def coolest_vehicles():
    """
    Query for the top coolfactor dougscores and returns them in a list of score dictionaries
    """
    coolest = DougScore.query.order_by(desc(DougScore.weekend_coolfactor)).limit(12)
    return {'coolest': [cool.to_dict_with_vehicle() for cool in coolest]}


@dougscore_routes.route('/fastest')
def fastest_vehicles():
    """
    Query for the top acceleration dougscores and returns them in a list of score dictionaries
    """
    fastest = DougScore.query.order_by(desc(DougScore.weekend_acceleration)).limit(12)
    return {'fastest': [fast.to_dict_with_vehicle() for fast in fastest]}


@dougscore_routes.route('/mostpractical')
def most_practical_vehicles():
    """
    Query for highest practicality rating and returns them in a list of score dictionaries
    """
    most_practical = DougScore.query.order_by(desc(DougScore.daily_practicality)).limit(12)
    return {'most_practical': [practical.to_dict_with_vehicle() for practical in most_practical]}


@dougscore_routes.route('/<int:id>')
def dougscore(id):
    """
    Query for a dougscore by id and returns that dougscore in a dictionary
    """
    dougscore = DougScore.query.get(id)
    return dougscore.to_dict()