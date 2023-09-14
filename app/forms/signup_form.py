from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    name = StringField('full_name', validators=[
                        DataRequired(message="You must provide a name to continue."),
                        Length(min=2, max=99, message="Name must be between %(min)d and %(max)d characters long.")
                        ])
    email = StringField('email', validators=[
                        DataRequired(message="You must provide a valid email address to continue."), 
                        Email(message="Email format is not correct."), 
                        Length(min=8, max=128, message="Email must be between %(min)d and %(max)d characters long."), 
                        user_exists
                        ])
    password = StringField('password', validators=[
                        DataRequired(message="You must provide a password to continue."), 
                        Length(min=9, max=128, message="Password must be between %(min)d and %(max)d characters long."),
                        ])