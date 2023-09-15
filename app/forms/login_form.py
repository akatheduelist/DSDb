from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[
                        DataRequired(message="Enter your email"), 
                        Email(message="Enter a valid email address"), 
                        Length(min=8, max=128, message="Enter a valid email address"), 
                        user_exists
                        ])
    password = StringField('password', validators=[
                        DataRequired(message="Enter your password."), 
                        Length(min=8, max=128, message="Password must be at least %(min)d characters."), 
                        password_matches
                        ])