from datetime import datetime
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Location, Comment, Post, Image, Album
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import PostForm, FormValidation
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)

# Delete post by id
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_to_be_deleted = Post.query.get(id)
    userId = current_user.id

    if not post_to_be_deleted:
        result = {
            "errors": ["post couldn't be found"],
            "statusCode": 404
        }
        return jsonify(result), 404

    if userId != post_to_be_deleted.user_id :
        result = {
            "errors": ["Could not delete other's post"],
            "statusCode": 403
        }
        return jsonify(result), 403

    if post_to_be_deleted and form.validate_on_submit():
        db.session.delete(post_to_be_deleted)
        db.session.commit()

        result = {
            "message": "post deleted",
            "statusCode": 200
        }
        return jsonify(result), 200

    else:
        result = {
            "errors": ["post couldn't be deleted"],
            "statusCode": 400
        }
        return jsonify(result), 400

# Update post by id
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_to_be_updated = Post.query.get(id)
    userId = current_user.id

    if not post_to_be_updated:
        result = {
            "errors": ["post couldn't be found"],
            "statusCode": 404
        }
        return jsonify(result), 404

    if userId != post_to_be_updated.user_id :
        result = {
            "errors": ["Could not update other's post"],
            "statusCode": 403
        }
        return jsonify(result), 403

    if post_to_be_updated and form.validate_on_submit():
        post_to_be_updated.post = form.post.data
        post_to_be_updated.preview_img = form.preview_img.data
        db.session.commit()
        
        post_to_be_updated = post_to_be_updated.to_dict()
        # post_to_be_updated['post_user'] = User.query.get(post_to_be_updated['user_id']).to_dict()

        return jsonify(post_to_be_updated), 200

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Create a post for a location
@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_location = Location.query.get(form.location_id.data)
    userId = current_user.id

    if not post_location:
        result = {
            "errors": ["location couldn't be found"],
            "statusCode": 404
        }
        return jsonify(result), 404

    if post_location and form.validate_on_submit():
        post = Post(
            user_id=userId,
            location_id=form.location_id.data,
            post=form.post.data,
            preview_img=form.preview_img.data,
        )
        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict()), 200

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Get post by id
@post_routes.route('/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    if not post:
        result = {
            "errors": ["post couldn't be found"],
            "statusCode": 404
        }
        return jsonify(result), 404
   
    return jsonify(post.to_dict()), 200

# Get all posts
@post_routes.route('', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])
