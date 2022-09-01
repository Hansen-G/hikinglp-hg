from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length


class CommentForm(FlaskForm):
    user_id = IntegerField("User Id")
    post_id = IntegerField("Post ID")
    comment = StringField("Comment", validators=[DataRequired(), Length(max=1000)])
    
    
class DeleteCommentForm(FlaskForm):
    pass

class FormValidation(FlaskForm):
    pass