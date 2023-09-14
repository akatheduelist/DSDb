from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, NumberRange, Length

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[
                            DataRequired(message="You must provide a valid rating to continue."),
                            NumberRange(min=1, max=10, message="Rating must be between %(min)d and %(max)d stars."),
                            ])
    review = TextAreaField('review', validators=[
                            DataRequired(message="You must provide a valid review to continue."),
                            Length(min=600, max=10000, message="Your review must be between %(min)d and %(max)d characters long.")
                            ])