from app.models import db, Review, User, Vehicle, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import lorem, python

fake = Faker()
fake.add_provider(lorem)
fake.add_provider(python)

def fake_reviews():
    users = User.query.all()
    num_of_users = len(users)
    vehicles = Vehicle.query.all()
    for vehicle in vehicles:
        for _ in range(4):
            yield Review(
                rating = fake.pyint(min_value=1, max_value=10),
                review = fake.paragraph(),
                user_id = fake.pyint(min_value=1, max_value=num_of_users),
                vehicle_id = vehicle.id
            )

# Adds sample reviews from faker information
def seed_reviews():
    reviews = list(fake_reviews())
    [db.session.add(review) for review in reviews]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()