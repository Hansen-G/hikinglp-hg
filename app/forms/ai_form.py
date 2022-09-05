from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, url, Length


class AIForm(FlaskForm):
    prompt = StringField("Prompt", validators=[DataRequired(), Length(max=1000)])
    