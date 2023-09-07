from app.models import db, Vehicle, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import date_time, lorem, address

fake = Faker()
fake.add_provider(date_time)
fake.add_provider(lorem)
fake.add_provider(address)

def fake_vehicles():
    pass
    # users = User.query.all()
    # num_of_users = len(users)
    for _ in range(40):
        yield Vehicle(
            year = fake.year(),
            make = fake.word(),
            model = fake.word(),
            trim = fake.word(),
            vehicle_country = fake.country_code()
        )

# Adds sample reviews from faker information
def seed_vehicles():
    vehicles = list(fake_vehicles())
    [db.session.add(vehicle) for vehicle in vehicles]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_vehicles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM vehicles"))
        
    db.session.commit()