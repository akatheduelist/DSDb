from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def reviews():
    """
    Query for all reviews and returns them in a list of user dictionaries
    """
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/<int:id>')
@login_required
def review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    review = Review.query.get(id)
    return review.to_dict()


# TO-DO User validation and return errors
@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    """
    Create a new review associated with a specific vehicle
    """
    request_data = request.get_json()
    # form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(id)
    # review.id = id
    review.review = request_data['review']
    review.rating = request_data['rating']
    review.user_id = request_data['user_id']
    review.vehicle_id = request_data['vehicle_id']
    db.session.commit()
    return "Success"
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Deletes a review by id
    """
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()