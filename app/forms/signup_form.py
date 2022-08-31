from app.forms.login_form import password_matches
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, url
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def check_username_length(form, field):
    #Checking length of username
    username = field.data
    if len(username) < 4:
        raise ValidationError(
            'Username should be be longer than 4 characters.')
    if len(username) > 50:
        raise ValidationError('Username should to be less than 50 characters.')


def check_password_length(form, field):
    #Checking length of username
    password = field.data
    if len(password) < 6:
        raise ValidationError(
            'Password should be be longer than 6 characters.')
    if len(password) > 64:
        raise ValidationError('Username should to be less than 64 characters.')
def check_password_data(form, field):
    password = field.data
    def has_uppercase(password):
        return any(char.isupper() for char in password)
    def has_lowercase(password):
        return any(char.islower() for char in password)
    def has_numbers(password):
        return any(char.isdigit() for char in password)
    def has_special_characters(password):
        return any(char in '!@#$%^&*()_+' for char in password)
    if not has_uppercase(password):
        raise ValidationError('Password must contain at least one uppercase letter.')
    if not has_lowercase(password):
        raise ValidationError('Password must contain at least one lowercase letter.')
    if not has_numbers(password):
        raise ValidationError('Password must contain at least one number.')
    if not has_special_characters(password):
        raise ValidationError('Password must contain at least one special character.')
    
    
    


def password_matches(password):
    return password == form.password.data

def check_password_matches(form, field):
    password = field.data
    if not password_matches(password):
        raise ValidationError('Passwords do not match.')




class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), 
            check_username_length, 
            username_exists
            ])
    email = StringField(
        'email', validators=[
            DataRequired(), 
            Length(max=255, message="Email cannot exceed 255 characters!"), 
            user_exists
            ])
    name = StringField(
        'name', validators=[
            DataRequired(), 
            Length(max=64, message="Name should not exceed 64 characters"),
            Length(
                min=4, message='Name cannot be empty and need to be at least 4 characters long.')])

    password = StringField(
        'password', validators=[
            DataRequired(),
            check_password_data,
            check_password_length,
            ])
    
    retype_password = StringField(
        'retype_password', validators=[
            DataRequired(),
            check_password_matches,
            ])
    preiview_image = StringField(
        'preview_image', validators=[
            url(message="Please enter a valid URL"),
            ])
    
