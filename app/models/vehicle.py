from .db import db, environment, SCHEMA, add_prefix_for_prod

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer(4), nullable=False)
    make = db.Column(db.String(40), nullable=False)
    model = db.Column(db.String(40), nullable=False)
    trim = db.Column(db.String(40))
    vehicle_country = db.Column(db.String(2))
    dougscore_id = db.Column(db.Integer(), nullable=False)

    dougscore = db.relationship("Dougscore", uselist=False, back_populates="vehicle", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'year': self.year,
            'make': self.make,
            'model': self.model,
            'trim': self.trim,
            'vehicle_country': self.vehicle_country,
        }
