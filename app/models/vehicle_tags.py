from .db import db, environment, SCHEMA, add_prefix_for_prod

vehicle_tags = db.Table(
    'vehicle_tags',
    db.Column("tag_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True),
    db.Column("vehicle_id", db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")), primary_key=True)
)

# if environment == "production":
#     __table_args__ = {'schema': SCHEMA}

if environment == "production":
    vehicle_tags.schema = SCHEMA

# class VehicleTag(db.Model):
#     __tablename__ = 'vehicle_tags'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
#     vehicle_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("vehicles.id")))
    
#     tag = db.relationship("Tag", back_populates="vehicle_tags")
#     vehicle = db.relationship("Vehicle", back_populates="vehicle_tags")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'tag_id': self.tag_id,
#             'vehicle_id': self.vehicle_id
#         }