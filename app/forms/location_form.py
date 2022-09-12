from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length, NumberRange
from app.models import Location


# def location_exists(form, field):
#     # Checking if location exists
#     # if (form.method.data == 'POST'):
#     name = field.data
#     location = Location.query.filter(Location.name == name).first()
#     if location:
#         raise ValidationError('Location already exists.')



class LocationForm(FlaskForm):
    name = StringField("Name", validators=[
        DataRequired(message="Name is required"), 
        # location_exists,
        Length(min=1, max=100, message="Name must be between 1 and 100 characters")])
    details = StringField("Location Details", validators=[
        DataRequired(message="Details is required"), 
        Length(max=2000)])
    address = StringField("Location Address", validators=[
        DataRequired(message="Address is required"),
        Length(max=1000, message="Address must be less than 1000 characters")])
    directionsInfo = StringField("Directions Info", validators=[
        DataRequired(message="Directions Info is required"),
        Length(max=2000, message="Directions Info must be less than 2000 characters")])
    city = StringField("City", validators=[
        DataRequired(message="City is required"),
        Length(max=100, message="City must be less than 100 characters")])
    state = StringField("State", validators=[
        DataRequired(message="State is required"),
        Length(max=100, message="State must be less than 100 characters")])
    preview_img = StringField("Preview image", validators=[
        Length(max=1000, message="Preview image must be less than 1000 characters")])
    lat = FloatField("Latitude", validators=[
        # DataRequired(message="Latitude is required"), 
        NumberRange(min=-90, max=90, message="Latitude must be between -90 and 90")])
    lng = FloatField("Longitude", validators=[
        # DataRequired(message="Longitude is required"), 
        NumberRange(min=-180, max=180, message="Longitude must be between -180 and 180")])

class DeleteLocationForm(FlaskForm):
    pass

class FormValidation(FlaskForm):
    pass