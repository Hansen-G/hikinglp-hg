from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length, NumberRange


class LocationForm(FlaskForm):
    name = StringField("Name", validators=[
        DataRequired(message="Name is required"), 
        Length(min=1, max=100, message="Name must be between 1 and 100 characters")])
    details = StringField("Location Details", validators=[
        DataRequired(message="Details is required"), 
        Length(max=2000)])
    address = StringField("Location Address", validators=[
        DataRequired(message="Address is required"),
        Length(max=1000, message="Address must be less than 1000 characters")])
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