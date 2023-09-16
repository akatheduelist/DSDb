from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Review
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

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


@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    """
    Updates a review associated with a specific vehicle
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        review.id = id
        review.rating = form.data['rating']
        review.review = form.data['review']
        review.user_id = form.data['user_id']
        review.vehicle_id = form.data['vehicle_id']
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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