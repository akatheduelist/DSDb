from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(99), nullable=False)
    bio = db.Column(db.Text())
    gender = db.Column(db.Enum('m', 'f', name='user_gender'))
    dob = db.Column(db.Date())
    country = db.Column(db.String(2))
    profile_image = db.Column(db.String(255))

    reviews = db.relationship("Review", back_populates="user")
    quirks = db.relationship("Quirk", back_populates="user")
    vehicle_images = db.relationship("VehicleImage", back_populates="user")

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
