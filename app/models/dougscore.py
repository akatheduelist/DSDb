from .db import db, environment, SCHEMA, add_prefix_for_prod

class DougScore(db.Model):
    __tablename__ = 'dougscores'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    weekend_styling = db.Column(db.Integer, nullable=False)
    weekend_acceleration = db.Column(db.Integer, nullable=False)
    weekend_handling = db.Column(db.Integer, nullable=False)
    weekend_funfactor = db.Column(db.Integer, nullable=False)
    weekend_coolfactor = db.Column(db.Integer, nullable=False)
    weekend_total = db.Column(db.Integer, nullable=False)
    daily_features = db.Column(db.Integer, nullable=False)
    daily_comfort = db.Column(db.Integer, nullable=False)
    daily_quality = db.Column(db.Integer, nullable=False)
    daily_practicality = db.Column(db.Integer, nullable=False)
    daily_value = db.Column(db.Integer, nullable=False)
    daily_total = db.Column(db.Integer, nullable=False)
    dougscore_total = db.Column(db.Integer, nullable=False)
    video_link = db.Column(db.String(255), nullable=False)
    location_id = db.Column(db.Integer, nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")), nullable=False)

    vehicle = db.relationship("Vehicle", back_populates="dougscore")

    def to_dict(self):
        return {
            'weekend_styling': self.weekend_styling,
            'weekend_acceleration': self.weekend_acceleration,
            'weekend_handling': self.weekend_handling,
            'weekend_funfactor': self.weekend_funfactor,
            'weekend_coolfactor': self.weekend_coolfactor,
            'weekend_total': self.weekend_total,
            'daily_features': self.daily_features,
            'daily_comfort': self.daily_comfort,
            'daily_quality': self.daily_quality,
            'daily_practicality': self.daily_practicality,
            'daily_value': self.daily_value,
            'daily_total': self.daily_total,
            'dougscore_total': self.dougscore_total,
            'video_link': self.video_link,
            'location_id': self.location_id,
            'vehicle_id': self.vehicle_id
        }
