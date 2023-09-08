from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")))
    
    user = db.relationship("User", back_populates="reviews")
    vehicle = db.relationship("Vehicle", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'review': self.review,
            'user_id': self.user_id,
            'vehicle_id': self.vehicle_id
        }