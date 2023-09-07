from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Vehicle

vehicle_routes = Blueprint('vehicles', __name__)


@vehicle_routes.route('/')
def vehicles():
    """
    Query for all vehicles and returns them in a list of vehicle dictionaries
    """
    vehicles = Vehicle.query.all()
    return {'vehicles': [vehicle.to_dict() for vehicle in vehicles]}


@vehicle_routes.route('/<int:id>')
def vehicle(id):
    """
    Query for a vehicle by id and returns that vehicle in a dictionary
    """
    vehicle = Vehicle.query.get(id)
    return vehicle.to_dict()