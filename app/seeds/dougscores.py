from app.models import db, DougScore, Vehicle, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import python, internet

fake = Faker()
fake.add_provider(python)
fake.add_provider(internet)

def fake_dougscores():
    vehicles = Vehicle.query.all()
    for vehicle in vehicles:
        yield DougScore(
            weekend_styling = fake.pyint(min_value=1, max_value=10),
            weekend_acceleration = fake.pyint(min_value=1, max_value=10),
            weekend_handling = fake.pyint(min_value=1, max_value=10),
            weekend_funfactor = fake.pyint(min_value=1, max_value=10),
            weekend_coolfactor = fake.pyint(min_value=1, max_value=10),
            weekend_total = fake.pyint(min_value=5, max_value=50),
            daily_features = fake.pyint(min_value=1, max_value=10),
            daily_comfort = fake.pyint(min_value=1, max_value=10),
            daily_quality = fake.pyint(min_value=1, max_value=10),
            daily_practicality = fake.pyint(min_value=1, max_value=10),
            daily_value = fake.pyint(min_value=1, max_value=10),
            daily_total = fake.pyint(min_value=5, max_value=50),
            dougscore_total = fake.pyint(min_value=10, max_value=100),
            video_link = fake.url(),
            location_id = fake.pyint(min_value=1, max_value=10),
            vehicle_id = vehicle.id
        )

# Adds sample dougscores from faker information
def seed_dougscores():
    dougscores = list(fake_dougscores())
    [db.session.add(dougscore) for dougscore in dougscores]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the vehicles table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dougscores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dougscores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dougscores"))
        
    db.session.commit()