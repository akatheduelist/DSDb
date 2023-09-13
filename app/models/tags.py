from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")))

    # user = db.relationship("User", back_populates="tags")
    # vehicle = db.relationship("Vehicle", back_populates="tags")

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag,
        }