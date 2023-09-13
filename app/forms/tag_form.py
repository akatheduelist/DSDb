from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class TagForm(FlaskForm):
    tag = StringField('tag', validators=[DataRequired()])