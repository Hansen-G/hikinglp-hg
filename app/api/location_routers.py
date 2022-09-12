from datetime import datetime
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Location, Comment, Post, Image, Album
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LocationForm, FormValidation
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

from .auth_routes import validation_errors_to_error_messages

location_routes = Blueprint('locations', __name__)


# add image to AWS S3 bucket, return url to image
@location_routes.route('/upload', methods=['POST'])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    url = upload["url"]
    return {"url": url}

@location_routes.route('/signupimg', methods=['POST'])
def upload_image_sign_up():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    url = upload["url"]
    return {"url": url}

# delete location
@location_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_location(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    location_to_be_deleted = Location.query.get(id)
    userId = current_user.id

    if not location_to_be_deleted:
        result = {
            "errors": ["location couldn't be found"],
            "statusCode": 404
        }
        return jsonify(result), 404

    if userId != location_to_be_deleted.user_id :
        result = {
            "errors": ["Could not delete other's location"],
            "statusCode": 403
        }
        return jsonify(result), 403

    if location_to_be_deleted and form.validate_on_submit():
        db.session.delete(location_to_be_deleted)
        db.session.commit()

        result = {
            "message": "location deleted",
            "statusCode": 200
        }
        return jsonify(result), 200

    else:
        result = {
            "errors": ["location couldn't be deleted"],
            "statusCode": 400
        }
        return jsonify(result), 400

# update location
@location_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_location(id):
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    location_to_be_updated = Location.query.get(id)
    userId = current_user.id

    if not location_to_be_updated:
        result = {
            "errors": ["location couldn't be found"],
            "statusCode": 404
        }
        return jsonify(result), 404

    if userId != location_to_be_updated.user_id :
        result = {
            "errors": ["Could not update other's location"],
            "statusCode": 403
        }
        return jsonify(result), 403

    if location_to_be_updated and form.validate_on_submit():
        if len(form.data['name']) >0 and len(form.data['name']) <100 :
            location_to_be_updated.name = form.data['name']
        if len(form.data['details']) >0 and len(form.data['details']) <2000 :
            location_to_be_updated.details = form.data['details']
        if len(form.data['address']) >0 and len(form.data['address']) <1000 :
            location_to_be_updated.address = form.data['address']
        if len(form.data['preview_img']) >0 and len(form.data['preview_img']) <1000 :
            location_to_be_updated.preview_img = form.data['preview_img']
        if form.data['lat'] and form.data['lat'] <=90 and form.data['lat'] >= -90:
            location_to_be_updated.lat = form.data['lat']
        if form.data['lng'] and form.data['lng'] <=180 and form.data['lng'] >= -180:
            location_to_be_updated.lng = form.data['lng']
        if form.data['city'] and len(form.data['city']) <100 :
            location_to_be_updated.city = form.data['city']
        if form.data['state'] and len(form.data['state']) <100 :
            location_to_be_updated.state = form.data['state']
        if form.data['directionsInfo'] and len(form.data['directionsInfo']) <2000 :
            location_to_be_updated.directionsInfo = form.data['directionsInfo']

        db.session.commit()
        location_to_be_updated = location_to_be_updated.to_dict()
        location_to_be_updated['location_user'] = User.query.get(userId).to_dict()
        return jsonify(location_to_be_updated), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Create new location
@location_routes.route('/new', methods=['POST'])
@login_required
def create_location():
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
   
    if form.validate_on_submit():
        new_location = Location(
            name=form.name.data,
            address=form.address.data,
            details=form.details.data,
            preview_img=form.preview_img.data,
            lat=form.lat.data,
            lng=form.lng.data,
            city=form.city.data,
            state=form.state.data,
            directionsInfo=form.directionsInfo.data,
            user_id=current_user.id
        )
        db.session.add(new_location)
        db.session.commit()
        return jsonify(new_location.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Get location by id
@location_routes.route('/<int:id>', methods=['GET'])
def get_location_by_id(id):
    location = Location.query.get(id)
    if location:
        return jsonify(location.to_dict())
    return jsonify({
        "errors": ["Location not found"],
        "statusCode": 404
        }), 404
    


# Get all location feed
@location_routes.route('')
def get_location_homepage():
    all_locations = Location.query.filter().order_by(Location.createdAt.desc()).all()
    return_JSON = ([i.to_dict() for i in all_locations])
    return jsonify(return_JSON)

