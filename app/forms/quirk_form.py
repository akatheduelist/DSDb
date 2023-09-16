from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class QuirkForm(FlaskForm):
    quirk = StringField('quirk', validators=[
                        DataRequired(message="This field cannot be blank."),
                        Length(min=8, max=255, message="Quirk or Feature must be between %(min)d and %(max)d characters long.")
                        ])
    user_id = IntegerField('user_id')
    vehicle_id = IntegerField('vehicle_id')