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