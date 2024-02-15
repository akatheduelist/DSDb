from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Vehicle, Review, Quirk, VehicleImage, Tag, vehicle_tags
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


@vehicle_routes.route('/<int:id>')
def vehicle(id):
    """
    Query for a vehicle by id and returns that vehicle in a dictionary
    """
    vehicle = Vehicle.query.get(id)
    return vehicle.to_dict()


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


@vehicle_routes.route('/<int:id>/images')
def vehicle_images(id):
    """
    Query for a vehicle images by vehicle_id and returns that vehicle images in a dictionary
    """
    images = VehicleImage.query.filter_by(vehicle_id=id)
    return [image.to_dict() for image in images]


@vehicle_routes.route('/search', methods=["POST"])
def vehicle_search():
    # TODO Pagination
    page = request.args.get('page', 1, type=int)
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        search_query = form.search.data

        # Split the search query into separate 'words' by space
        split_query = search_query.split(" ")

        # If the 'word' is a number and is exactly 4 numbers it is a year, more or less.
        # Put it in the query_years list and create a years_set.
        # TODO Not sure what to do about the BMW 2002 yet.
        query_years = list(filter(lambda word: word.isnumeric() and len(word) is 4, split_query))
        years_set = set()
        
        # If the 'word' is alphanumeric or if the 'word' is all numbers but is not exactly 4 characters it is a make or a model name.
        # This is the best I could do with models like the "LC 500" where there is a numeric portion of the model name.
        query_strings = list(filter(lambda word: word.isalpha() or word.isnumeric() and len(word) is not 4, split_query))
        strings_set = set()

        # Map through each 'year' in the years list and put the results in a years_set.
        # EX: ["1999", "2001", "2021"] would put all vehicles from these years into the years_set.
        for search_year in query_years:
            filtered_by_year = Vehicle.query.filter(db.or_(Vehicle.year.ilike(int(search_year))))
            for result in filtered_by_year:
                years_set.add(result)

        # Map through each of the 'not-years' in the strings list check if the string is like a make or a model.
        # If there is a match put it in the strings_set.
        # EX: ["Jeep", "Gladiator", "BMW", "M5"] would get all Jeeps(make), Gladiators(models), BMWs(make), and M5s(model)
        for search_string in query_strings:
            filtered_by_make_model = Vehicle.query.filter(db.or_(Vehicle.model.ilike(search_string), Vehicle.make.ilike(search_string)))
            for result in filtered_by_make_model:
                strings_set.add(result)

        # Compare results to return
        # If there are only years and no other strings in the search we return all results from those years.
        if len(years_set) >= 1 and len(strings_set) < 1:
            results = list(years_set)
            return [result.to_dict() for result in results]
        
        # If there are only strings with no years, we will return all of those results regardless of year.
        if len(years_set) < 1 and len(strings_set) >= 1:
            results = list(strings_set)
            return [result.to_dict() for result in results]
        
        #If there are strings AND years we compare the two sets and return the results that are only in both.
        # EX: "1999 2001 2021 Jeep Gladiator BMW M5" would return all of the Jeep Gladiators from 1999 2001 or 2021
        # and all of the BMW M5s from 1999 2001 or 2021
        if len(years_set) >= 1 and len(strings_set) >= 1:
            results = list(years_set.intersection(strings_set))
            return [result.to_dict() for result in results]
        else:
            return {'errors': ['wat?']}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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


@vehicle_routes.route('/<int:id>/tags', methods=["POST"])
@login_required
def post_vehicle_tag(id):
    """
    Create a new tag associated with a specific vehicle
    """
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        vehicle = Vehicle.query.get(id)
        tag = Tag.query.get(form.data['tag_id'])
        vehicle.tags.append(tag)
        # db.session.add(vehicle_tag)
        db.session.commit()
        return "Success"
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@vehicle_routes.route('/<int:vehicle_id>/tags/<int:tag_id>', methods=["DELETE"])
@login_required
def delete_vehicle_tag(vehicle_id, tag_id):
    """
    Delete a tag associated with a specific vehicle
    """
    vehicle = Vehicle.query.get(vehicle_id)
    tag = Tag.query.get(tag_id)
    vehicle.tags.remove(tag)
    db.session.commit()
    return vehicle.to_dict()

