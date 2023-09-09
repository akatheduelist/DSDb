from .db import db, environment, SCHEMA, add_prefix_for_prod

class VehicleImage(db.Model):
    __tablename__ = 'vehicle_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")))
    
    user = db.relationship("User", back_populates="vehicle_images")
    vehicle = db.relationship("Vehicle", back_populates="vehicle_images")

    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'vehicle_id': self.vehicle_id
        }