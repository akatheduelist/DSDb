from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

tags_list = [
    "Quirky",
    "Rare",
    "Beautiful",
    "Gas Guzzler",
    "Electric",
    "5+ Wheels",
    "3 Wheels",
    "Big Power",
    "Hypercar",
    "Fuel Effecient",
    "AWD",
    "4x4",
    "Offroad",
    "Military Spec",
    "Soviet Reliability",
    "Classic",
    "Italian Build Quality",
    "Custom Made",
    "Rare Specs",
    "Ample Legroom",
    "Convertable Top",
    "Quality",
    "Cool",
    "Practical",
    "German Sensibility",
    "Long Wheel Base",
    "80's Decals",
    "Unnecessary Badging",
    "Subtle Design",
    "Supercar",
    "JDM",
    "American Muscle",
    "Northstar",
    "2JZ",
    "V-8",
    "Turbo V-6",
    "Boxer",
    "I-6"
    "Turbo 4cyl."
    "3cyl."
    "K-Car",
    "V-12",
    "V-10",
    "W-16",
    "Twin-Turbo",
    "Quad-Turbo",
    "Subie Gang",
    "Supercharged",
    "British Engineering",
    "Ford Tough",
    "Like a Rock",
    "Zoom Zoom",
    "Power of Dreams",
    "Rebadged",
]

def fake_tags():
    for tag in tags_list:
        yield Tag(
            tag = tag,
        )

# Adds sample tags from faker information
def seed_tags():
    tags = list(fake_tags())
    [db.session.add(tag) for tag in tags]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))
        
    db.session.commit()