from .db import db, environment, SCHEMA, add_prefix_for_prod

class Quirk(db.Model):
    __tablename__ = 'quirks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quirk = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")))

    user = db.relationship("User", back_populates="quirks")
    vehicle = db.relationship("Vehicle", back_populates="quirks")

    def to_dict(self):
        return {
            'id': self.id,
            'quirk': self.quirk,
            'user_id': self.user_id,
            'vehicle_id': self.vehicle_id
        }