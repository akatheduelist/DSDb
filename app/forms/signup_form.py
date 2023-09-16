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
                        DataRequired(message="Enter your name"),
                        Length(min=2, max=99, message="Name must be between %(min)d and %(max)d characters long")
                        ])
    email = StringField('email', validators=[
                        DataRequired(message="Enter your email"), 
                        Email(message="Enter a valid email address"), 
                        Length(min=8, max=128, message="Email must be between %(min)d and %(max)d characters long"), 
                        user_exists
                        ])
    password = StringField('password', validators=[
                        DataRequired(message="Enter your password."), 
                        Length(min=8, max=128, message="Password must be at least %(min)d characters."),
                        ])