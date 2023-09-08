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

    def to_dict(self):
        return {
            'id': self.id,
            'year': self.year,
            'make': self.make,
            'model': self.model,
            'trim': self.trim,
            'vehicle_country': self.vehicle_country,
            'dougscore': {
                'weekend_styling': self.dougscore.weekend_styling,
                'weekend_acceleration': self.dougscore.weekend_acceleration,
                'weekend_handling': self.dougscore.weekend_handling,
                'weekend_funfactor': self.dougscore.weekend_funfactor,
                'weekend_coolfactor': self.dougscore.weekend_coolfactor,
                'weekend_total': self.dougscore.weekend_total,
                'daily_features': self.dougscore.daily_features,
                'daily_comfort': self.dougscore.daily_comfort,
                'daily_quality': self.dougscore.daily_quality,
                'daily_practicality': self.dougscore.daily_practicality,
                'daily_value': self.dougscore.daily_value,
                'daily_total': self.dougscore.daily_total,
                'dougscore_total': self.dougscore.dougscore_total,
                'video_link': self.dougscore.video_link,
                'location_id': self.dougscore.location_id,
            }
        }
