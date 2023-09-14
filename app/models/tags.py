from .db import db, environment, SCHEMA, add_prefix_for_prod
from .vehicle_tags import vehicle_tags

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(255), nullable=False)
    # vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")))

    vehicles = db.relationship("Vehicle", secondary=vehicle_tags, back_populates="tags")

    def to_dict(self):
        return {
            'id': self.id,
            'tag': self.tag,
        }