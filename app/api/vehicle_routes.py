from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Vehicle, Review
from app.forms import ReviewForm

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

@vehicle_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def vehicle_review(id):
    """
    Create a new review associated with a specific vehicle
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            rating=form.data['rating'],
            review=form.data['review'],
            user_id=current_user.id,
            vehicle_id=id
            )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@vehicle_routes.route('/<int:id>/reviews')
def vehicle_reviews(id):
    """
    Query for a vehicle review by vehicle_id and returns that vehicle review in a dictionary
    """
    reviews = Review.query.filter_by(vehicle_id=id)
    return [review.to_dict() for review in reviews]
