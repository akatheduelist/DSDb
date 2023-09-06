from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import enum

class Genders(enum.Enum):
    male = "Male"
    female = "Female"
    other = "Other"
    not_say = "I'd rather not say."

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(99))
    bio = db.Column(db.Text())
    gender = db.Column(db.Enum(Genders))
    dob = db.Column(db.Date())
    country = db.Column(db.String(2))
    profile_image = db.Column(db.String(255))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'bio': self.bio,
            'gender': self.gender,
            'dob': self.dob,
            'country': self.country,
            'profile_image': self.profile_image
        }
