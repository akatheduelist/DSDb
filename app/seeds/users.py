from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from faker.providers import person, address, date_time, internet, misc, lorem

fake = Faker()
fake.add_provider(person)
fake.add_provider(date_time)
fake.add_provider(internet)
fake.add_provider(misc)
fake.add_provider(lorem)
fake.add_provider(address)

def fake_users():
    for _ in range(10):
        yield User(
            username = fake.user_name(),
            email = fake.free_email(),
            password = fake.password(),
            full_name = fake.name(),
            bio = fake.paragraph(),
            gender = "m",
            dob = fake.date_of_birth(),
            country = fake.country_code(),
            profile_image = fake.image_url()
        )

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    
    generated_users = list(fake_users())
    add_users = [db.session.add(user) for user in generated_users]
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()