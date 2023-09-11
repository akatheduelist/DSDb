from flask import jsonify
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    make = db.Column(db.String(40), nullable=False)
    model = db.Column(db.String(40), nullable=False)
    trim = db.Column(db.String(40))
    vehicle_country = db.Column(db.String(2))

    dougscore = db.relationship("DougScore", uselist=False, back_populates="vehicle")
    quirks = db.relationship("Quirk", back_populates="vehicle")
    reviews = db.relationship("Review", back_populates="vehicle")
    vehicle_images = db.relationship("VehicleImage", back_populates="vehicle")

    def to_dict(self):
        vehicle = {
            'id': self.id,
            'year': self.year,
            'make': self.make,
            'model': self.model,
            'trim': self.trim,
            'vehicle_country': self.vehicle_country,
            'dougscore': self.dougscore.to_dict(),
            'images': [image.to_dict() for image in self.vehicle_images],
            'reviews': [review.to_dict() for review in self.reviews],
            'quirks': [quirk.to_dict() for quirk in self.quirks]
        }
        return vehicle
