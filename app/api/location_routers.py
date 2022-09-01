from datetime import datetime
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Location, Comment, Post, Image, Album
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LocationForm

location_routes = Blueprint('locations', __name__)




# Create new location
@location_routes.route('/new', methods=['POST'])
@login_required
def create_location():
    form = LocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        if not form.preview_img.data:
            form.preview_img.data = 'https://res.cloudinary.com/hansenguo/image/upload/v1654572769/cld-sample-2.jpg'
        new_location = Location(
            name=form.name.data,
            address=form.address.data,
            details=form.details.data,
            preview_img=form.preview_img.data,
            lat=form.lat.data,
            lng=form.lng.data,
            user_id=current_user.id
        )
        db.session.add(new_location)
        db.session.commit()
        return jsonify(new_location.to_dict())

    return jsonify(form.errors), 400

# Get location by id
@location_routes.route('/<int:id>', methods=['GET'])
def get_location_by_id(id):
    location = Location.query.get(id)
    if location:
        return jsonify(location.to_dict())
    return jsonify({"message": "Location not found"}), 404
    


# Get all location feed
@location_routes.route('')
def get_location_homepage():
    all_locations = Location.query.filter().order_by(Location.createdAt.desc()).all()
    return_JSON = ([i.to_dict() for i in all_locations])
    return jsonify(return_JSON)

