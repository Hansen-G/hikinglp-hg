from datetime import datetime
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Location, Comment, Post, Image, Album
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LocationForm

comment_routes = Blueprint('comments', __name__)