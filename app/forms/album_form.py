from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length


class AlbumForm(FlaskForm):
    user_id = IntegerField("User Id")
    name = StringField("Album Name", validators=[DataRequired(), Length(max=100)])
    tag1 = StringField("Album tag1", validators=[Length(max=64)])
    tag2 = StringField("Album tag1", validators=[Length(max=64)])
    tag3 = StringField("Album tag1", validators=[Length(max=64)])
    location_id = IntegerField("Location ID")
    description = StringField("Album description", validators=[DataRequired(), Length(max=1000)])
    preview_img = StringField("Preview image", validators=[DataRequired(), url(), Length(min=1, max=1000)])
    
class DeleteAlbumForm(FlaskForm):
    pass

class FormValidation(FlaskForm):
    pass