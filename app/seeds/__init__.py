from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .dougscores import seed_dougscores, undo_dougscores
from .quirks import seed_quirks, undo_quirks
from .vehicle_images import seed_vehicle_images, undo_vehicle_images
from .tags import seed_tags, undo_tags

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_dougscores()
        undo_reviews()
        undo_quirks()
        undo_tags()
        # undo_vehicle_images()
    seed_users()
    seed_dougscores()
    seed_reviews()
    seed_quirks()
    seed_vehicle_images()
    seed_tags()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_dougscores()
    undo_reviews()
    undo_quirks()
    undo_tags()
    undo_vehicle_images()
