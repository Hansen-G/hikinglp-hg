from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length


class LocationForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=1, max=100)])
    details = StringField("Location Details", validators=[DataRequired(), Length(max=2000)])
    address = StringField("Location Address", validators=[DataRequired(), Length(max=1000)])
    preview_img = StringField("Preview image", validators=[Length(max=1000)])
    # TBD
    lat = FloatField("Latitude")
    lng = FloatField("Longitude")
    
class DeleteLocationForm(FlaskForm):
    pass

class FormValidation(FlaskForm):
    pass