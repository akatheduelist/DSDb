from app.models import db, VehicleImage, User, Vehicle, DougScore, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import internet, python
import re

fake = Faker()
fake.add_provider(internet)
fake.add_provider(python)



def fake_vehicle_images():
    users = User.query.all()
    num_of_users = len(users)
    vehicles = Vehicle.query.all()
    for vehicle in vehicles:
        # youtube_link = vehicle.dougscore.video_link
        # youtube_id = re.findall(r"(?<=\=)(.*?)(?=\?)",youtube_link)
        # print("YOUTUBE ID ==> ", youtube_id)
        for _ in range(4):
            yield VehicleImage(
                image_url = fake.image_url(width=640, height=480),
                user_id = fake.pyint(min_value=1, max_value=num_of_users),
                vehicle_id = vehicle.id
            )

# Adds sample vehicle_images from faker information
def seed_vehicle_images():
    vehicle_images = list(fake_vehicle_images())
    [db.session.add(vehicle_image) for vehicle_image in vehicle_images]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_vehicle_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.vehicle_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM vehicle_images"))
        
    db.session.commit()