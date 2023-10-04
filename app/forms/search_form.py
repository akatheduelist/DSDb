from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length

class SearchForm(FlaskForm):
    search = StringField('search', validators=[DataRequired(message="This field cannot be blank.")])
    submit = SubmitField("submit")