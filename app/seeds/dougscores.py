from app.models import db, DougScore, Vehicle, environment, SCHEMA
from sqlalchemy.sql import text
import csv
import os
import pandas as pd
from faker import Faker
from faker.providers import lorem, python

fake = Faker()
fake.add_provider(lorem)
fake.add_provider(python)

def seed_dougscores():
    spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1HcFstlJdQMlMEWhbdKXZWdAzR5RFMtj3kywLQcgkGPw/export?format=csv'
    pd.options.display.max_rows = 200
    df = pd.read_csv(spreadsheet_url)
    df.dropna(inplace = True) 
    print(df.loc[2])
    # Get the local path where the seed file exists on the system
    seed_dir = os.path.dirname(__file__)
    # Notate the relative path to the CSV file to be parsed
    seed_file = "20230905_dougscore.csv"
    # Concat the local path with the relative path to the file
    seed_file_path = os.path.join(seed_dir, seed_file)
    # Open seed file and parse out columns of each row to corresponding attribute
    with open(seed_file_path, 'r') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            vehicle = Vehicle(
                year = row[0],
                make = row[1],
                model = row[2],
                trim = 'N/A',
                description = fake.paragraph(),
                vehicle_country = row[20],
                )
            dougscore = DougScore(
                vehicle = vehicle,
                weekend_styling = row[3],
                weekend_acceleration = row[4],
                weekend_handling = row[5],
                weekend_funfactor = row[6],
                weekend_coolfactor = row[7],
                weekend_total = row[8],
                daily_features = row[9],
                daily_comfort = row[10],
                daily_quality = row[11],
                daily_practicality = row[12],
                daily_value = row[13],
                daily_total = row[14],
                dougscore_total = row[15],
                video_time = row[16],
                video_link = row[17],
                filming_location = row[18]+", "+row[19]
                )
            db.session.add(vehicle)
            db.session.add(dougscore)
            db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the vehicles table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dougscores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.vehicles RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.dougscores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM vehicles"))
        db.session.execute(text("DELETE FROM dougscores"))
        
    db.session.commit()
