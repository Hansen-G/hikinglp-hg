from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length


class PostForm(FlaskForm):
    user_id = IntegerField("User Id")
    location_id = IntegerField("Location ID")
    post = StringField("Post", validators=[DataRequired(), Length(max=2000)])
    preview_img = StringField("Preview image", validators=[DataRequired(), url(), Length(min=1, max=1000)])
    
class DeletePostForm(FlaskForm):
    pass

class FormValidation(FlaskForm):
    pass