from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Vehicle, Review, Quirk, VehicleImage, Tag
from app.forms import ReviewForm, QuirkForm, TagForm, SearchForm
from sqlalchemy import desc

vehicle_routes = Blueprint('vehicles', __name__)


@vehicle_routes.route('/')
def vehicles():
    """
    Query for all vehicles and returns them in a list of vehicle dictionaries
    """
    vehicles = Vehicle.query.order_by(desc(Vehicle.year)).limit(12)
    return {'vehicles': [vehicle.to_dict() for vehicle in vehicles]}


@vehicle_routes.route('/search', methods=["POST"])
def vehicle_search():
    page = request.args.get('page', 1, type=int)
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        search_query = form.search.data
        if search_query.isnumeric():
            searched = Vehicle.query.filter(db.or_(Vehicle.year.ilike(search_query))).order_by(Vehicle.model).paginate(page=page, per_page=10)
        else:
            string_query = ''.join(i for i in search_query if i.isalpha())
            searched = Vehicle.query.filter(db.or_(Vehicle.model.ilike('%' + string_query + '%'), Vehicle.make.like('%' + string_query + '%'))).order_by(Vehicle.model).paginate(page=page, per_page=10)
        return [search.to_dict() for search in searched]
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@vehicle_routes.route('/<int:id>')
def vehicle(id):
    """
    Query for a vehicle by id and returns that vehicle in a dictionary
    """
    vehicle = Vehicle.query.get(id)
    return vehicle.to_dict()


@vehicle_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_vehicle(id):
    """
    Update a vehicle entry
    """
    request_data = request.get_json()
    # form['csrf_token'].data = request.cookies['csrf_token']
    vehicle = Vehicle.query.get(id)
    vehicle.description = request_data['description']
    db.session.commit()
    return "Success"
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@vehicle_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def vehicle_review(id):
    """
    Create a new review associated with a specific vehicle
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'POST' and form.validate_on_submit():
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


@vehicle_routes.route('/<int:id>/quirks')
def vehicle_quirks(id):
    """
    Query for a vehicle quirks by vehicle_id and returns that vehicle quirks in a dictionary
    """
    quirks = Quirk.query.filter_by(vehicle_id=id)
    return [quirk.to_dict() for quirk in quirks]


@vehicle_routes.route('/<int:id>/quirks', methods=["POST"])
@login_required
def post_vehicle_quirk(id):
    """
    Create a new quirk associated with a specific vehicle
    """
    form = QuirkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("USERID ==> ", current_user.id, "VEHICLE_ID ==> ", id)
        quirk = Quirk(
            quirk=form.data['quirk'],
            user_id=current_user.id,
            vehicle_id=id
            )
        db.session.add(quirk)
        db.session.commit()
        return quirk.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@vehicle_routes.route('/<int:id>/images')
def vehicle_images(id):
    """
    Query for a vehicle images by vehicle_id and returns that vehicle images in a dictionary
    """
    images = VehicleImage.query.filter_by(vehicle_id=id)
    return [image.to_dict() for image in images]


@vehicle_routes.route('/<int:id>/tags', methods=["POST"])
@login_required
def post_vehicle_tag(id):
    """
    Create a new tag associated with a specific vehicle
    """
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.data)
        vehicle = Vehicle.query.get(id)
        tag = Tag.query.get(form.data['tag_id'])
        vehicle.tags.append(tag)
        # db.session.add(vehicle_tag)
        db.session.commit()
        return "Success"
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


