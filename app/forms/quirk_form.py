from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class QuirkForm(FlaskForm):
    quirk = StringField('quirk', validators=[DataRequired()])
    user_id = IntegerField('user_id')
    vehicle_id = IntegerField('vehicle_id')