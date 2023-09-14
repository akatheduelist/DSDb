from app.models import db, VehicleImage, User, Vehicle, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import internet, python
import requests

fake = Faker()
fake.add_provider(internet)
fake.add_provider(python)


# Adds sample vehicle_images from faker information
def seed_vehicle_images():
    users = User.query.all()
    num_of_users = len(users)
    vehicles = Vehicle.query.all()
    for vehicle in vehicles:
        print(len(vehicle.vehicle_images))
        if len(vehicle.vehicle_images) < 1:
            # EX: https://www.youtube.com/watch?v=_UKBxM7m7qo becomes _UKBxM7m7qo
            youtube_id = vehicle.dougscore.video_link[32:43]
            # EX: _UKBxM7m7qo becomes _UKBxM7m7qo becomes "https://img.youtube.com/vi/_UKBxM7m7qo/maxresdefault.jpg"
            youtube_thumbnail = "https://img.youtube.com/vi/"+youtube_id+"/maxresdefault.jpg"
            # Add the youtube thumbnail to each vehicle in the database and assign to a fake user
            vehicle_image1 = VehicleImage(
                image_url = youtube_thumbnail,
                user_id = fake.pyint(min_value=1, max_value=num_of_users),
                vehicle_id = vehicle.id
            )
            db.session.add(vehicle_image1)
            db.session.commit()
        if len(vehicle.vehicle_images) < 2:
            response = requests.get(f"https://api.unsplash.com/search/photos?client_id=OsLCtgt819go9Q71ENBYUh5-DK7kiWPBiy8mwXUatq0&query={vehicle.make}+{vehicle.model}&orientation=portrait&per_page=1",timeout=10)
            if response.status_code == 200:
                data = response.json()
                for result in data['results']:
                    vehicle_image2 = VehicleImage(
                    image_url = result['urls']['small'],
                    user_id = fake.pyint(min_value=1, max_value=num_of_users),
                    vehicle_id = vehicle.id
                    )
                    db.session.add(vehicle_image2)
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